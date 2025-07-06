import { Module } from '@nestjs/common';
import { User } from 'src/database/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}
