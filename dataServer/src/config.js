import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const port = 3001;
export const dbPath = path.join(__dirname, '../database.json');
