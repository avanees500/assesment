// src/file/upload/storage.config.ts

import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { allowedMimeTypes, FILE_UPLOAD_PATH } from 'src/common/constant';
import { v4 as uuidv4 } from 'uuid';

export const createFileStorage = () =>
  diskStorage({
    destination: FILE_UPLOAD_PATH,
    filename: (req, file, cb) => {
      const uniqueSuffix = uuidv4();
      const ext = extname(file.originalname);
      cb(null, `${uniqueSuffix}${ext}`);
    },
  });

// ✅ File filter for MIME types
export const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${file.mimetype}`), false);
  }
};
