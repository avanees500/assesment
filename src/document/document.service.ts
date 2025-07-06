import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { join } from 'path';
import { promises as fspromises } from 'fs';
import * as fs from 'fs';
import { FILE_UPLOAD_PATH } from 'src/common/constant';
import { Document } from 'src/database/models/document.model';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Document)
    private readonly documentModel: typeof Document,
  ) {}
  private uploadDir = join(process.cwd(), FILE_UPLOAD_PATH);
  async create(file: Express.Multer.File, createdBy?: string) {
    try {
      return await this.documentModel.create({
        filename: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        path: file.path,
        createdBy,
      });
    } catch (error) {
      console.error('Error uploading document:', error);
      throw new InternalServerErrorException('Failed to upload document');
    }
  }

  async findAll(): Promise<string[]> {
    try {
      await fspromises.access(this.uploadDir);

      const files = await fspromises.readdir(this.uploadDir);
      return files.map((file) => `${FILE_UPLOAD_PATH}/${file}`);
    } catch (error) {
      console.error('Error reading uploaded files:', error);
      throw new InternalServerErrorException('Failed to list uploaded files');
    }
  }

  async findOne(id: number) {
    try {
      const doc = await this.documentModel.findByPk(id);
      if (!doc) throw new NotFoundException(`Document with ID ${id} not found`);
      return doc;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error('Error fetching document:', error);
      throw new InternalServerErrorException('Failed to fetch document');
    }
  }

  async update(
    id: number,
    file: Express.Multer.File,
    updatedBy: string,
    body: any,
  ) {
    const document = await this.documentModel.findByPk(id);

    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    const oldFilePath = join(process.cwd(), 'uploads', document.filename);
    if (fs.existsSync(oldFilePath)) {
      await fs.promises.unlink(oldFilePath);
    }

    document.filename = file.filename;
    document.originalName = file.originalname;
    document.updatedBy = updatedBy;
    document.updatedAt = new Date();

    await document.save();

    return {
      message: 'Document updated successfully',
      filePath: `${FILE_UPLOAD_PATH}/${file.filename}`,
    };
  }

  async remove(id: number) {
    try {
      const doc = await this.findOne(id);
      await doc.destroy();
      return { message: `Document with ID ${id} deleted successfully` };
    } catch (error) {
      console.error('Error deleting document:', error);
      throw new InternalServerErrorException('Failed to delete document');
    }
  }
}
