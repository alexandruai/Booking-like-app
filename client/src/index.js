import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { SearchContextProvider } from "./context/SearchContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const root = ReactDOM.createRoot(document.getElementById("root"));
//const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
const stripePromise = await loadStripe("pk_test_51NPWnlDaKxANHW6bpEptpxFzAA79pKnJJzf4mAthmqeJnBxzO3WUidz79l06G9v2pFqCkRJaMALT2ddmuxEKnr2F00KAlkF8JE");

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);