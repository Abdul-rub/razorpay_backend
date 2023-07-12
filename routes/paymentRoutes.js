import express from "express"
import { VerifyPayment, checkout,getPaymentHistory } from "../controller/paymentController.js";


const router = express.Router()

router.route("/checkout").post(checkout)

router.route("/verifypayment").post(VerifyPayment)

router.route("/paymenthistory").get(getPaymentHistory)



export default router;