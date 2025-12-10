import { Routes, Route, Navigate } from "react-router-dom";
import PaymentsPage from "@/pages/Payments/PaymentsPage";
import PaymentDetailsPage from "@/pages/PaymentDetails/PaymentDetailsPage";
import ForbiddenPage from "@/pages/Forbidden/ForbiddenPage";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";

export const AppRoutes = () => (
  <Routes>
    <Route path="/payments/:paymentId" element={<PaymentDetailsPage />} />
    <Route path="/payments" element={<PaymentsPage />} />
    <Route path="/" element={<Navigate to="/payments" replace />} />
    <Route path="/403" element={<ForbiddenPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
