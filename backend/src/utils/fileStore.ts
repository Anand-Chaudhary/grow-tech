import fs from 'fs';
import path from 'path';

/**
 * Reads a JSON file from the data folder and parses it.
 * If the file does not exist, returns the provided default value.
 */
export function readJson<T>(fileName: string, defaultValue: T): T {
  const filePath = path.resolve(__dirname, '..', 'data', fileName);
  try {
    if (!fs.existsSync(filePath)) {
      return defaultValue;
    }
    const raw = fs.readFileSync(filePath, { encoding: 'utf-8' });
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error('Failed to read JSON file', fileName, err);
    return defaultValue;
  }
}

/**
 * Writes data to a JSON file in the data folder.
 */
export function writeJson<T>(fileName: string, data: T): void {
  const filePath = path.resolve(__dirname, '..', 'data', fileName);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), { encoding: 'utf-8' });
}
