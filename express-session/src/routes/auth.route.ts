import express from "express";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import db from "../db/index.js";
import { login } from "@services/auth.service.js";

const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;
    const token = login(username, password);

    res.status(200).send(token);
  } catch (e) {
    console.log(e);
    res.status(500).send("Server error");
  }
});

authRouter.post("/signup", (req, res) => {
  try {
    const { users } = db.data!;
    const { username, password } = req.body;

    if (users.find((user) => user.username === username)) {
      res.status(400).send("Username already taken");
      return;
    }

    // Hash the password
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);

    db.data!.users.push({ username, password: hash });
    db.write();

    res.status(200).send("OK");
  } catch (e) {
    console.log(e);
    res.status(500).send("Server error");
  }
});

export default authRouter;
