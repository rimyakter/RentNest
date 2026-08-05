import express, { type Application } from "express";
import { notFound } from "./middleware/not-found";
import { globalErrorHandler } from "./middleware/global-error";
import cookieParser from "cookie-parser";
import authRouter from "./modules/auth/auth.routes";
import userRouter from "./modules/user/user.routes";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is Running Noman!");
});

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.use(notFound);
app.use(globalErrorHandler);

export default app;
