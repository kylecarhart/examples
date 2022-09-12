import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../env/index.js";
import db from "../db/index.js";
import { hashSync, genSaltSync, compareSync } from "bcrypt";

const authRouter = express.Router();

authRouter.post("/login", (req, res) => {
  try {
    const { users } = db.data;
    const { username, password } = req.body;

    const user = users.find((_user) => _user.username === username);

    // Check user exists and password is correct
    if (!user || !compareSync(password, user.password)) {
      res.status(400).send("Invalid login");
      return;
    }

    console.log(JWT_SECRET);
    // Give back a jwt token for successful login
    const token = jwt.sign({}, JWT_SECRET, {
      expiresIn: "2h",
      audience: "user",
      subject: req.body.username,
    });

    res.status(200).send(token);
  } catch (e) {
    console.log(e);
    res.status(500).send("Server error");
  }
});

authRouter.post("/signup", (req, res) => {
  try {
    const { users } = db.data;
    const { username, password } = req.body;

    if (users.find((user) => user.username === username)) {
      res.status(400).send("Username already taken");
      return;
    }

    // Hash the password
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);

    db.data.users.push({ username, password: hash });
    db.write();

    res.status(200).send("OK");
  } catch (e) {
    console.log(e);
    res.status(500).send("Server error");
  }
});

export default authRouter;
