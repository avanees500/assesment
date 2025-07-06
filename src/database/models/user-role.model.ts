// src/database/models/user-role.model.ts

import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  CreatedAt,
  UpdatedAt,
  AllowNull,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Role } from './role.model';
import { Optional } from 'sequelize';

export interface UserRoleAttributes {
  userId: number;
  roleId: number;
  createdBy: number;
  updatedBy: number;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRoleCreationAttributes = Optional<
  UserRoleAttributes,
  'createdAt' | 'updatedAt'
>;

@Table({
  tableName: 'user_roles',
  timestamps: true,
})
export class UserRole
  extends Model<UserRoleAttributes, UserRoleCreationAttributes>
  implements UserRoleAttributes
{
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare userId: number;

  @ForeignKey(() => Role)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare roleId: number;

  @ForeignKey(() => User)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  declare createdBy: number;

  @ForeignKey(() => User)
  @AllowNull(true)
  @Column(DataType.INTEGER)
  declare updatedBy: number;

  @CreatedAt
  @AllowNull(false)
  @Column(DataType.DATE)
  declare createdAt: Date;

  @UpdatedAt
  @AllowNull(false)
  @Column(DataType.DATE)
  declare updatedAt: Date;
}
