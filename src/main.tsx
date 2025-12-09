import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import PaymentDetailsPage from "@/pages/PaymentDetails/PaymentDetailsPage";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<Navigate to="/payments" replace />} />
        <Route path="/payments" element={<App />} />
        <Route path="/payments/:paymentId" element={<PaymentDetailsPage />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
