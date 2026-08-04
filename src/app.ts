import express, { type Application } from "express";
import prisma from "./lib/prisma";
import config from "./config";

const app: Application = express();

app.get("/", (req, res) => {
  res.send("Server is Running!");
});

app.get("/cars", async (req, res) => {
  const cars = await prisma.car.findMany();
  res.json(cars);
});

export default app;
