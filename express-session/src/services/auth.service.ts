import { compare, genSalt, hash } from "bcrypt";
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
export async function login(
  username: string,
  password: string
): Promise<string> {
  const { users } = db.data!;
  const user = users.find((_user) => _user.username === username);

  if (!user) {
    throw new HTTPException(401, "Invalid login");
  }

  const isGoodPass = await compare(password, user.password);
  if (!isGoodPass) {
    throw new HTTPException(401, "Invalid login");
  }

  // Give back a jwt token for successful login
  return jwt.sign({}, JWT_SECRET!, {
    expiresIn: "2h",
    audience: "user",
    subject: username,
  });
}

/**
 * Sign the user up
 * @param username
 * @param password
 */
export async function signup(
  username: string,
  password: string
): Promise<void> {
  const { users } = db.data!;

  if (users.find((user) => user.username === username)) {
    throw new HTTPException(409, "Username already taken");
  }

  // Hash the password
  const salt = await genSalt(10);
  const hashPw = await hash(password, salt);

  db.data!.users.push({ username, password: hashPw });
  await db.write();
}
