// src/roles/dto/assign-role.dto.ts
import { IsString, IsUUID } from 'class-validator';

export class AssignRoleDto {
  @IsString()
  userId: string;

  @IsString()
  roleId: string;
}
