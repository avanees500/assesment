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
import { User } from './user.model';
import { UserRole } from './user-role.model';
import { Optional } from 'sequelize';

export interface RoleAttributes {
  id: number;
  name: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type RoleCreationAttributes = Optional<
  RoleAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

@Table({ tableName: 'roles' })
export class Role
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes
{
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare createdBy: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare updatedBy: string;

  @CreatedAt
  @AllowNull(false)
  @Column(DataType.DATE)
  declare createdAt: Date;

  @UpdatedAt
  @AllowNull(false)
  @Column(DataType.DATE)
  declare updatedAt: Date;

  @BelongsToMany(() => User, () => UserRole)
  declare users: User[];
}
