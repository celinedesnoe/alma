import { formatCurrency } from "@/helpers/currency";
import { fetchPayments } from "@/services/payments";
import type { Payment } from "@/types/payments";
import useSWR from "swr";
import PaymentCard from "@/components/PaymentCard/PaymentCard";
import InfoCard from "@/components/InfoCard/InfoCard";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";
import EmptyState from "@/components/EmptyState/EmptyState";

const PaymentsPage = () => {
  const { data, error, isLoading } = useSWR("/payments", fetchPayments);

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  if (!data) return <EmptyState />;

  if (data) {
    const { total_amount_left_to_pay, payments } = data;

    return (
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
    );
  }
};

export default PaymentsPage;
