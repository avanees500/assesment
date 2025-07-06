import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/database/models/user.model';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/database/models/role.model';
import { UserResponse } from './user.types';
import { UniqueConstraintError } from 'sequelize';
import { omit } from 'lodash';
import { UserRole } from 'src/database/models/user-role.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponse> {
    try {
      const { name, email, mobileNumber, password } = createUserDto;

      const existingUser = await this.userModel.findOne({ where: { email } });

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userModel.create({
        name,
        email,
        mobileNumber,
        password: hashedPassword,
      });
      const plain = user.get({ plain: true });
      return omit(plain, 'password') as UserResponse;
    } catch (err) {
      if (err instanceof ConflictException) throw err;
      if (err instanceof UniqueConstraintError) {
        const field = err.errors?.[0]?.path ?? 'Field';
        const value = err.errors?.[0]?.value ?? '';
        throw new ConflictException(`${field} "${value}" already exists`);
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred while creating the user. Please try again later.',
      );
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.findAll();

      if (!users || users.length === 0) {
        throw new NotFoundException('No users found');
      }

      return users;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error('Error fetching users:', error);

      throw new InternalServerErrorException(
        'Failed to fetch users. Please try again later.',
      );
    }
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({
        where: { email },
        attributes: ['id', 'email', 'password'],
        include: [
          {
            model: Role,
            through: { attributes: [] },
            attributes: ['id', 'name'],
          },
        ],
      });

      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error(`Error finding user by email "${email}":`, error);

      throw new InternalServerErrorException(
        'An unexpected error occurred while finding the user. Please try again later.',
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOne(id);

      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      await user.update(updateUserDto);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update user. Please try again later.',
      );
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const user = await this.findOne(id);
      await user.destroy();
      return { message: `User with ID ${id} deleted successfully` };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to delete user. Please try again later.',
      );
    }
  }

  async assignRole(userId: number, roleId: number, assignerId: number) {
    try {
      const user = await this.findOne(userId);
      const role = await Role.findByPk(roleId);

      if (!user || !role) throw new NotFoundException('User or Role not found');

      await UserRole.create({
        userId: user.id,
        roleId: role.id,
        createdBy: assignerId,
        updatedBy: assignerId,
      });
      return {
        message: `Role '${role.name}' assigned to user '${user.email}'`,
      };
    } catch (error) {
      console.log('error', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Failed to assign role to user. Please try again later.',
      );
    }
  }
}
