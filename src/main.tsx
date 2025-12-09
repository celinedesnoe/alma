import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import PaymentDetailsPage from "@/pages/PaymentDetails/PaymentDetailsPage";
import PaymentsPage from "@/pages/Payments/PaymentsPage.tsx";

import "./index.css";
import ForbiddenPage from "./pages/Forbidden/ForbiddenPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<Navigate to="/payments" replace />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/payments/:paymentId" element={<PaymentDetailsPage />} />
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
