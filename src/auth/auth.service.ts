import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UsersService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload, LoginResponse, SafeUser, User } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<SafeUser | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: _pw, ...rest } = user['dataValues'] as unknown as User;
      return rest;
    }
    return null;
  }

  async login(user: SafeUser): Promise<LoginResponse> {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      roles: user.roles.map((role) => role.name),
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
