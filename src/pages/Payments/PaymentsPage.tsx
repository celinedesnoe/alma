import { fetchPayments } from "@/services/payments";
import type { Payment } from "@/types/payments";
import useSWR from "swr";

const PaymentsPage = () => {
  const { data, error, isLoading } = useSWR("/payments", fetchPayments);

  // TODO: Create a Loading Page
  if (isLoading) {
    return <div data-testid="loading">Loading...</div>;
  }

  // TODO: Create a Error Page
  if (error) {
    return <div data-testid="error">{error}</div>;
  }

  return (
    <div data-testid="payments-page">
      <h1>Your payments</h1>

      <div>{data?.total_amount_left_to_pay}</div>
      <ul>
        {data?.payments.map((payment: Payment) => (
          //TODO: Create a card component
          <li key={payment.id}>
            <div>{payment.id}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentsPage;
