import { useParams } from "react-router";

import { fetchPaymentDetails } from "@/services/payments";
import useSWR from "swr";
import BackButton from "@/components/BackButton/BackButton";
import Layout from "@/Layout";

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

  const { merchant_display_name } = data;

  // TODO: Add back button
  return (
    <Layout>
      <div data-testid="payment-details-page">
        <BackButton />
        <h1 className="mt-8 mb-8 text-3xl">
          Your purchase at {merchant_display_name}
        </h1>
        <div>id: {paymentId}</div>
      </div>
    </Layout>
  );
};

export default PaymentDetailsPage;
