import { useEffect } from "react";
import { useParams } from "react-router";

import { fetchPaymentDetails } from "@/services/payments";

const PaymentDetailsPage = () => {
  const { paymentId } = useParams();

  useEffect(() => {
    fetchPaymentDetails(paymentId || "");
  }, [paymentId]);

  return <div>This is Payment Detail page for {paymentId}</div>;
};

export default PaymentDetailsPage;
