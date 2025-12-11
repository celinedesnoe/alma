import { useParams } from "react-router";

import { fetchPaymentDetails } from "@/services/payments";
import useSWR from "swr";

const PaymentDetailsPage = () => {
  const { paymentId } = useParams();

  const { data, error, isLoading } = useSWR(paymentId, fetchPaymentDetails);

  // TODO: Create a Loading Page
  if (isLoading) {
    return <div data-testid="loading">Loading...</div>;
  }

  // TODO: Create a Error Page
  if (error) {
    return <div data-testid="error">Error</div>;
  }

  if (!data) {
    return null;
  }

  // TODO: Add back button
  return (
    <div data-testid="payment-details-page">
      This is Payment Detail page for {paymentId}
    </div>
  );
};

export default PaymentDetailsPage;
