import express from "express"
import { VerifyPayment, checkout,getPaymentHistory,getPaymentSuccessfull } from "../controller/paymentController.js";


const router = express.Router()

router.route("/checkout").post(checkout)

router.route("/verifypayment").post(VerifyPayment)

router.route("/paymenthistory").get(getPaymentHistory)

router.route("/paymentsuccessful").get(getPaymentSuccessfull)

export default router;