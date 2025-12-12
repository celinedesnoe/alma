import { useParams } from "react-router";

import { fetchPaymentDetails } from "@/services/payments";
import useSWR from "swr";
import BackButton from "@/components/BackButton/BackButton";
import Layout from "@/Layout";
import InfoCard from "@/components/InfoCard/InfoCard";
import { formatCurrency } from "@/helpers/currency";
import { formatUnixDate, padMonth } from "@/helpers/date";
import { findNextDueDate } from "@/helpers/installment";

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
  const { formattedDate } = findNextDueDate(payment_plan);

  return (
    <Layout>
      <div data-testid="payment-details-page">
        <BackButton />
        <h1 className="mt-8 mb-8 text-3xl">Your payment detail</h1>
        <div className="flex flex-col items-center lg:flex-row lg:items-start">
          <div className="rounded border border-gray-100 px-4 py-4 shadow-md lg:mr-8">
            <img alt="" src={logo_url ?? "/logo.svg"} width="48" height="48" />
          </div>
          <div className="flex flex-col items-center lg:items-start">
            <h2 className="text-2xl">{merchant_display_name}</h2>
            <p>Purchased on {formatUnixDate(created)}</p>
            <div className="text-xs text-gray-500">id: {paymentId}</div>
          </div>
        </div>
        {/* TODO: Add red banner if late */}
        {/* TODO: Add greend banner if paid */}
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
        <div className="rounded border border-gray-100 px-4 py-4 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Your payment method</h2>
          <div>
            <p className="mb-4">You will be withdraw automatically on: </p>
            <span>
              {card.brand.toLocaleUpperCase()} - {card.last4}
            </span>
            <p>
              Expiration date:{" "}
              <span>
                {padMonth(card.exp_month)}/{card.exp_year}
              </span>
            </p>
          </div>
        </div>
        <div>PAYMENT PLAN WITH TABS</div>
      </div>
    </Layout>
  );
};

export default PaymentDetailsPage;
