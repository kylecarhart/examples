import { HTTPException } from "@exceptions/http.exception.js";
import { NextFunction, Request, Response } from "express";

export function errorMiddleware(
  error: HTTPException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { status, message } = error;

  console.log(`${status} - ${message}`);
  res.status(status).send({ status, message });
}
