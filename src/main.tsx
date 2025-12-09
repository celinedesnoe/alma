import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import PaymentDetailsPage from "@/pages/PaymentDetails/PaymentDetailsPage";
import PaymentsPage from "@/pages/Payments/PaymentsPage.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<Navigate to="/payments" replace />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/payments/:paymentId" element={<PaymentDetailsPage />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
