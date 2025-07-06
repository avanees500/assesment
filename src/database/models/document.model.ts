// src/database/models/document.model.ts

import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';

export interface DocumentAttributes {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type DocumentCreationAttributes = Optional<
  DocumentAttributes,
  'id' | 'createdBy' | 'updatedBy' | 'createdAt' | 'updatedAt'
>;

@Table({ tableName: 'documents' })
export class Document
  extends Model<DocumentAttributes, DocumentCreationAttributes>
  implements DocumentAttributes
{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare filename: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare originalName: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare mimeType: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare size: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare path: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare createdBy?: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare updatedBy?: string;

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date;
}
