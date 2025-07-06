// src/database/models/index.ts

import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { Dialect } from 'sequelize/types';
import * as process from 'process';
import configData from '../config/config';
import { User } from './user.model'; // example: static import (optional)
import { Role } from './role.model';
import { UserRole } from './user-role.model';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configData[env];

const db: { [key: string]: any } & { sequelize?: Sequelize; Sequelize?: typeof Sequelize } = {};

let sequelize: Sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
} else {
  sequelize = new Sequelize(
    config.database as string,
    config.username as string,
    config.password as string,
    {
      ...config,
      dialect: config.dialect as Dialect,
    }
  );
}

// Dynamically import all model files (besides this index file)
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      (file.endsWith('.ts') || file.endsWith('.js')) &&
      !file.endsWith('.d.ts') &&
      !file.includes('.test')
    );
  })
  .forEach(file => {
    const modelPath = path.join(__dirname, file);
    const modelFactory = require(modelPath).default;

    const model = modelFactory(sequelize, DataTypes);
    db[model.name] = model;
  });
  console.log("object",Object.keys(db))
Object.keys(db).forEach(modelName => {
  if (db[modelName]?.associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
