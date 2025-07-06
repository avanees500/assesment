// src/document/document.controller.ts
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
  ParseIntPipe,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { createFileStorage, fileFilter } from './upload/storage.config';
import { DocumentService } from './document.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/role-guard';
import { Roles } from 'src/auth/decorators/role.decorators';
import { FILE_UPLOAD_PATH, MAX_FILE_SIZE } from 'src/common/constant';

@Controller('documents')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'editor')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: createFileStorage(),
      fileFilter,
      limits: {
        fileSize: MAX_FILE_SIZE,
      },
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File, @Req() req) {
    return this.documentService.create(file, req.user?.email);
  }

  @Get('files')
  async getAllFiles() {
    const files = await this.documentService.findAll();
    return { files };
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: createFileStorage(),
      fileFilter,
      limits: {
        fileSize: MAX_FILE_SIZE,
      },
    }),
  )
  async updateDocument(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
    @Req() req,
  ) {
    return this.documentService.update(id, file, req.user?.email, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.remove(id);
  }
}
