import express, { type Application } from "express";
import { notFound } from "./middleware/not-found";
import { globalErrorHandler } from "./middleware/global-error";

const app: Application = express();

app.get("/", (req, res) => {
  res.send("Server is Running Noman!");
});
app.use(notFound);
app.use(globalErrorHandler);

export default app;
