import express, { type Application } from "express";
import { notFound } from "./middleware/not-found";
import { globalErrorHandler } from "./middleware/global-error";
import cookieParser from "cookie-parser";
import authRouter from "./modules/auth/auth.routes";
import userRouter from "./modules/user/user.routes";
import reviewRouter from "./modules/review/review.route";
import paymentRouter from "./modules/payment/payment.route";
import rentalRequestRouter from "./modules/rental-request/rental-request.route";
import categoryRouter from "./modules/category/category.route";
import propertyRouter from "./modules/property/property.route";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is Running Noman!");
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/properties", propertyRouter);
app.use("/categories", categoryRouter);
app.use("/rentals", rentalRequestRouter);
app.use("/payments", paymentRouter);
app.use("/reviews", reviewRouter);
app.use(notFound);
app.use(globalErrorHandler);

export default app;
