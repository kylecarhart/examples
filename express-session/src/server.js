import express from "express";
import authRouter from "./routes/auth.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Hello!`);
});

app.use("/", authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
