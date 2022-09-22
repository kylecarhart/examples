import * as dotenv from "dotenv";

// Read environment variables
dotenv.config();

export const { JWT_SECRET, PORT } = process.env;
