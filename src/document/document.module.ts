import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { FILE_UPLOAD_PATH } from 'src/common/constant';
import { createUploadPath } from 'src/utilis/upload.utilis';
import { SequelizeModule } from '@nestjs/sequelize';
import { Document } from 'src/database/models/document.model';

@Module({
  imports: [SequelizeModule.forFeature([Document])],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {
  onModuleInit() {
    createUploadPath(FILE_UPLOAD_PATH);
  }
}
