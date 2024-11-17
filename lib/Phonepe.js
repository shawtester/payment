// lib/phonepe.js

import axios from "axios";

export const createPayment = async (orderData) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_PHONEPE_BASE_URL,
      {
        merchantId: process.env.NEXT_PUBLIC_PHONEPE_MERCHANT_ID,
        apiKey: process.env.NEXT_PUBLIC_PHONEPE_API_KEY,
        orderData: orderData,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    return { error: "Failed to create payment" };
  }
};
