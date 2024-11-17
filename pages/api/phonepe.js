// pages/api/phonepe.js

import { createPayment } from "@/lib/Phonepe";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { orderData } = req.body;

    try {
      const paymentResponse = await createPayment(orderData);
      res.status(200).json(paymentResponse);
    } catch (error) {
      res.status(500).json({ error: "Payment creation failed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
