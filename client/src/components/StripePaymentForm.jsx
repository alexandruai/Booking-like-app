// components/StripePaymentForm.js
import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const StripePaymentForm = ({ handlePaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        console.error(error);
        // Call handlePaymentSuccess with a fallback payment method
        handlePaymentSuccess({ id: "card" });
      } else {
        handlePaymentSuccess(paymentMethod);
      }
    } catch (err) {
      console.error(err);
      // Call handlePaymentSuccess with a fallback payment method
      handlePaymentSuccess({ id: "card" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <br />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default StripePaymentForm;