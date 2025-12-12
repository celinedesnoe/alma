import { formatCurrency } from "@/helpers/currency";
import { fetchPayments } from "@/services/payments";
import type { Payment } from "@/types/payments";
import useSWR from "swr";
import PaymentCard from "@/components/PaymentCard/PaymentCard";
import Layout from "@/Layout";
import InfoCard from "@/components/InfoCard/InfoCard";

const PaymentsPage = () => {
  const { data, error, isLoading } = useSWR("/payments", fetchPayments);

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

  if (data) {
    const { total_amount_left_to_pay, payments } = data;

    return (
      <Layout>
        <div data-testid="payments-page">
          <h1 className="mt-8 mb-8 text-3xl">Your payments</h1>
          <InfoCard
            title="Your total amount left to pay:"
            value={formatCurrency(total_amount_left_to_pay)}
            valueTestId="total-amount-left-to-pay"
          />
          <ul>
            {payments.map((payment: Payment) => (
              <li key={payment.id}>
                <PaymentCard payment={payment} />
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    );
  }
};

export default PaymentsPage;
