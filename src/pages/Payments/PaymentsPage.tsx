import { formatCurrency } from "@/helpers/currency";
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

  if (!data) {
    return null;
  }

  if (data) {
    const { total_amount_left_to_pay, payments } = data;

    return (
      <div
        data-testid="payments-page"
        className="w-full px-8 py-4 md:w-2/3 lg:w-1/2 lg:px-24 lg:py-16"
      >
        <h1 className="mt-8 mb-8 text-3xl">Your payments</h1>

        <div className="flex flex-col rounded-lg bg-orange-100 px-3 py-6">
          <h2 className="text-l">Your total amount left to pay:</h2>
          <p className="text-2xl font-extrabold">
            {formatCurrency(total_amount_left_to_pay)}
          </p>
        </div>
        <ul>
          {payments.map((payment: Payment) => (
            //TODO: Create a card component
            <li key={payment.id}>
              <div>{payment.id}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default PaymentsPage;
