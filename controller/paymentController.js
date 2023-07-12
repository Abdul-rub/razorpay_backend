import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/paymentModel.js";


//Creating Payment
export const checkout = async (req, res) => {
  const { amount } = req.body;
  try {
    console.log(typeof amount);
    const options = {
      amount: parseInt(amount * 100),
      currency: "INR",
    };

    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "An error occurred during checkout.",
    });
  }
};


//Verifying the payment 
export const VerifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    try {
      // Saving to DB
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        status: "success", 
      });
      res.redirect(`http://localhost:5173/paymentsuccessfull?reference=${razorpay_payment_id}`);
    } catch (error) {
      console.error(error);
      res.redirect(`http://localhost:5173/paymentfailed?reference=${razorpay_order_id}`);
    }
  } else {
    try {
      // Saving to DB
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        status: "failed", 
      });
      res.redirect(`http://localhost:5173/paymentfailed?reference=${razorpay_order_id}`);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: "An error occurred while saving the payment details.",
      });
    }
  }
};


//Payment History
export const getPaymentHistory = async (req, res) => {
  try {
    const paymentHistory = await Payment.find().sort({ date: -1 });
    res.status(200).json({ success: true, paymentHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to fetch payment history." });
  }
};
