import { Router, type IRouter } from "express";
import auth from "../../middleware/auth";
import { confirmPayment, createPayment, getPayment, getPayments } from "./payment.controller";


const paymentRouter: IRouter = Router();

paymentRouter.post("/create", auth("TENANT"), createPayment);

paymentRouter.post("/confirm", auth("TENANT"), confirmPayment);

paymentRouter.get("/", auth("TENANT"), getPayments);

paymentRouter.get("/:id", auth("TENANT"), getPayment);

export default paymentRouter;