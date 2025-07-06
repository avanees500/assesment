import * as fs from 'fs';
import * as path from 'path';

export function createUploadPath(relativePath: string): string {
  const absolutePath = path.join(process.cwd(), relativePath);

  if (!fs.existsSync(absolutePath)) {
    fs.mkdirSync(absolutePath, { recursive: true });
  }

  return absolutePath;
}
