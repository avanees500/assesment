// src/roles/dto/create-role.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';
import { RoleEnum } from '../enum-roles';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: RoleEnum;
}
