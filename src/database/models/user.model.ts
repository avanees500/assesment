// src/database/models/user.model.ts

import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  CreatedAt,
  UpdatedAt,
  BelongsToMany,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Role } from './role.model';
import { UserRole } from './user-role.model';

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>;

@Table({ tableName: 'users' })
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  declare email: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare mobileNumber: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare password: string;

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date;

  @BelongsToMany(() => Role, () => UserRole)
  declare roles: Role[];
}
