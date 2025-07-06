// src/roles/roles.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/role.decorators';
import { RolesGuard } from 'src/auth/guards/role-guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  createRole(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @Get()
  getAllRoles() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  getRoleById(@Param('id') id: string) {
    return this.rolesService.findById(id);
  }

  @Delete('remove')
  removeRoleFromUser(@Body() dto: AssignRoleDto) {
    return this.rolesService.removeRole(dto.userId, dto.roleId);
  }
}
