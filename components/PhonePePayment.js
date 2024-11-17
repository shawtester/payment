import React, { useState } from "react";
import axios from "axios";

const PhonePePayment = () => {
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState({
    amount: 1000, // Example amount in smallest currency unit (e.g., paise)
    currency: "INR",
    transactionId: "TXN1234567890", // Ensure unique transaction IDs for each order
  });

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Replace 'process.env.NEXT_PUBLIC_PHONEPE_BASE_URL' with your actual URL or endpoint
      const response = await axios.post(process.env.NEXT_PUBLIC_PHONEPE_BASE_URL, {
        merchantId: process.env.NEXT_PUBLIC_PHONEPE_MERCHANT_ID,
        apiKey: process.env.NEXT_PUBLIC_PHONEPE_API_KEY,
        orderData,
      });

      if (response.data && response.data.paymentUrl) {
        // Redirect the user to the PhonePe payment page
        window.location.href = response.data.paymentUrl;
      } else {
        console.error("Payment initiation failed: No payment URL received.");
      }
    } catch (error) {
      console.error("Payment error:", error); // Log the top-level error
    
      // Log response-related error if available
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } 
      // Log request-related error if available
      else if (error.request) {
        console.error("Request data:", error.request);
      } 
      // If it's a configuration or message error
      else {
        console.error("Error message:", error.message);
      }
    }
     finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay with PhonePe"}
      </button>
    </div>
  );
};

export default PhonePePayment;
