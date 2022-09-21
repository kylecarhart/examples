import express from "express";
import authRouter from "@routes/auth.route.js";
import { errorMiddleware } from "@middlewares/error.middleware.js";
import compression from "compression";

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send(`Hello!`);
});

// Routes
app.use("/", authRouter);

app.use(errorMiddleware);

export default app;
