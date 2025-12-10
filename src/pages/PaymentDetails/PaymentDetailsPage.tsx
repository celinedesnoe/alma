import { useEffect } from "react";
import { useParams } from "react-router";

import { fetchPaymentDetails } from "@/services/payments";

const PaymentDetailsPage = () => {
  const { paymentId } = useParams();

  useEffect(() => {
    fetchPaymentDetails(paymentId || "");
  }, [paymentId]);

  return (
    <div data-testid="payment-details-page">
      This is Payment Detail page for {paymentId}
    </div>
  );
};

export default PaymentDetailsPage;
