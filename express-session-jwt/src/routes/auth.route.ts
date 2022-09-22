import express from "express";
import { login, signup } from "@services/auth.service.js";

const authRouter = express.Router();

authRouter.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  login(username, password)
    .then((token) => {
      res.status(200).send({ token });
    })
    .catch((e) => {
      next(e);
    });
});

authRouter.post("/signup", (req, res, next) => {
  const { username, password } = req.body;
  signup(username, password)
    .then(() => {
      res.status(200).send();
    })
    .catch((e) => {
      next(e);
    });
});

export default authRouter;
