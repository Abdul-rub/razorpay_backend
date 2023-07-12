import express from "express";
import { config } from "dotenv";
import Razorpay from "razorpay";
import paymentRoute from "./routes/paymentRoutes.js";
import cors from "cors";
import mongoose from "mongoose";

config({ path: "./config/config.env" });


//DB COnnection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB is connected with ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);

  }
};

connectDB();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

app.use("/api", paymentRoute);

//key
app.get("/api/getkey", (req, res) => {
  res.status(200).json({ key: [process.env.RAZORPAY_API_KEY] });
});

//Connection
app.listen(process.env.PORT, () => {
  console.log(`Server working on ${process.env.PORT}`);
});
