import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from 'src/database/models/role.model';
import { UsersService } from 'src/user/user.service';
import { UserRole } from 'src/database/models/user-role.model';

@Injectable()
export class RolesService {
  constructor(private readonly userService: UsersService) {}

  async createRole(dto: CreateRoleDto) {
    try {
      const role = await Role.create(dto);
      return { message: 'Role created', role };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create role. Please try again later.',
      );
    }
  }

  async findAll() {
    try {
      return await Role.findAll();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch roles. Please try again later.',
      );
    }
  }

  async findById(roleId: string) {
    try {
      const role = await Role.findByPk(roleId);
      if (!role) throw new NotFoundException('Role not found');
      return role;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Failed to fetch role. Please try again later.',
      );
    }
  }

  async removeRole(userId: string, roleId: string) {
    try {
      const user = await this.userService.findOne(Number(userId));
      const role = await Role.findByPk(roleId);

      if (!user || !role) throw new NotFoundException('User or Role not found');

      await user.$remove('roles', role);
      return {
        message: `Role '${role.name}' removed from user '${user.email}'`,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Failed to remove role from user. Please try again later.',
      );
    }
  }
}
