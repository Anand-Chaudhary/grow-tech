import { promises as fs } from 'fs';
import path from 'path';
import { LandingResponseData } from '../dto/landing.dto';

// Path to store landing page custom overrides. Stored under "backend/data/landing.json" relative to the project root.
const dataFilePath = path.resolve(process.cwd(), 'backend', 'data', 'landing.json');

/**
 * Load any custom landing page overrides from the JSON file.
 * Returns an empty object if the file does not exist or cannot be parsed.
 */
export const loadLandingOverrides = async (): Promise<Partial<LandingResponseData>> => {
  try {
    const raw = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    // File missing or JSON invalid – treat as no overrides.
    return {};
  }
};

/**
 * Persist custom landing page data (partial) to disk.
 * Creates the directory if it does not exist.
 */
export const saveLandingOverrides = async (data: Partial<LandingResponseData>): Promise<void> => {
  const dir = path.dirname(dataFilePath);
  await fs.mkdir(dir, { recursive: true });
  const json = JSON.stringify(data, null, 2);
  await fs.writeFile(dataFilePath, json, 'utf-8');
};
