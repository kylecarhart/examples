import { compareSync } from "bcrypt";
import db from "../db/index.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../env/index.js";
import { HTTPException } from "@exceptions/http.exception.js";

/**
 * Log in user and assign a jwt.
 * @param username
 * @param password
 * @returns JSON Web Token
 */
export function login(username: string, password: string): string {
  const { users } = db.data!;
  const user = users.find((_user) => _user.username === username);

  // Check user exists and password is correct
  if (!user || !compareSync(password, user.password)) {
    throw new HTTPException(401, "Invalid login");
  }

  // Give back a jwt token for successful login
  return jwt.sign({}, JWT_SECRET!, {
    expiresIn: "2h",
    audience: "user",
    subject: username,
  });
}
