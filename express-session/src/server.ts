import express from "express";
import authRouter from "@routes/auth.route.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Hello!`);
});

app.use("/", authRouter);

export default app;
