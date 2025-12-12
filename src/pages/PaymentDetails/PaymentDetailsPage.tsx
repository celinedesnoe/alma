import { useParams } from "react-router";

import { fetchPaymentDetails } from "@/services/payments";
import useSWR from "swr";
import BackButton from "@/components/BackButton/BackButton";
import InfoCard from "@/components/InfoCard/InfoCard";
import Error from "@/components/Error/Error";
import Loading from "@/components/Loading/Loading";
import { formatCurrency } from "@/helpers/currency";
import { formatUnixDate } from "@/helpers/date";
import { findNextDueDate } from "@/helpers/installment";
import CreditCardInfo from "@/components/CreditCardInfo/CreditCardInfo";
import { InstallmentState } from "@/types/common";
import EmptyState from "@/components/EmptyState/EmptyState";

const PaymentDetailsPage = () => {
  const { paymentId } = useParams();

  const { data, error, isLoading } = useSWR(paymentId, fetchPaymentDetails);

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  if (!data) return <EmptyState />;

  const {
    merchant_display_name,
    logo_url,
    amount_left_to_pay,
    purchase_amount,
    created,
    payment_plan,
    customer: { card },
  } = data;

  // TODO: Use state for the banner later
  const { formattedDate, state } = findNextDueDate(payment_plan);

  const isLate = state === InstallmentState.LATE;
  const isPaid = state === InstallmentState.PAID;

  return (
    <div data-testid="payment-details-page">
      <BackButton />
      <h1 className="mt-8 mb-8 text-3xl">Your payment detail</h1>
      <div className="flex flex-col items-center md:flex-row md:items-start">
        <div className="rounded border border-gray-100 px-4 py-4 shadow-md md:mr-8">
          <img alt="" src={logo_url ?? "/logo.svg"} width="48" height="48" />
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl">{merchant_display_name}</h2>
          <p>Purchased on {formatUnixDate(created)}</p>
          <div className="text-xs text-gray-500">id: {paymentId}</div>
        </div>
      </div>

      {isLate ? (
        <InfoCard
          title="You have a late installment"
          color="bg-red-100"
          className="mt-8"
        />
      ) : null}
      {isPaid ? (
        <InfoCard
          title="You have paid all installments"
          color="bg-green-100"
          className="mt-8"
        />
      ) : null}
      <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-2">
        <InfoCard
          color="bg-gray-200"
          title="Your purchase amount:"
          value={formatCurrency(purchase_amount)}
          valueTestId="purchase-amount"
          className="lg:col-span-1 lg:w-full"
        />
        <InfoCard
          title="Your amount left to pay:"
          value={formatCurrency(amount_left_to_pay)}
          valueTestId="amount-left-to-pay"
          className="lg:col-span-1 lg:w-full"
        />
      </div>
      <div className="mb-4 rounded border border-gray-100 px-4 py-4 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Your next installment</h2>
        <p>
          You will be withdraw automatically on{" "}
          <span className="text-orange-600">{formattedDate}</span>
        </p>
      </div>
      <CreditCardInfo card={card} state={state} />
      <div>PAYMENT PLAN WITH TABS</div>
    </div>
  );
};

export default PaymentDetailsPage;
