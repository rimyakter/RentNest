import { configDotenv } from "dotenv";

configDotenv();

const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
};

export default config;
