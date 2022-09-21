import { dirname, join } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";
import { DatabaseData } from "@models/databasedata.model.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, "db.json");
const adapter = new JSONFile<DatabaseData>(file);
const db = new Low(adapter);

// Read data from JSON file, this will set db.data content
await db.read();

// Set default data
if (!db.data) {
  db.data = { users: [] };
}

export default db;
