import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

export const readDataFile = (filename: string) => {
  const filePath = path.join(process.cwd(), 'data', filename);
  try {
    return JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch (error) {
    return [];
  }
};

export const writeDataFile = (filename: string, data: any) => {
  const filePath = path.join(process.cwd(), 'data', filename);
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}; 