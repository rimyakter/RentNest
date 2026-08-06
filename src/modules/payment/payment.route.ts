import { Router, type IRouter } from "express";

import auth from "../../middleware/auth";

import { checkout, getMyPayments } from "./payment.controller";

const paymentRouter: IRouter = Router();

paymentRouter.post("/checkout/:rentalRequestId", auth("TENANT"), checkout);

paymentRouter.get("/my", auth("TENANT"), getMyPayments);


export default paymentRouter;
