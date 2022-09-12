import dotenv from "dotenv";

// Read environemnt variables
dotenv.config();

export const { JWT_SECRET } = process.env;
