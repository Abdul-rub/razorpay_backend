import mongoose from "mongoose";


const paymentSchema = new mongoose.Schema({
    razorpay_order_id:{
        type: String,
        required: true,
    },
    razorpay_payment_id:{
        type: String,
        required: true,
    },
    razorpay_signature:{
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "failed",
        enum: ["success", "failed"],
      },
      date: {
        type: Date,
        default: Date.now,
      },

});

export const Payment = mongoose.model("Payment", paymentSchema)