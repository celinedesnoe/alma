import { useParams } from "react-router";

import { fetchPaymentDetails } from "@/services/payments";
import useSWR from "swr";
import BackButton from "@/components/Common/BackButton/BackButton";
import InfoCard from "@/components/Common/InfoCard/InfoCard";
import Error from "@/components/Common/Error/Error";
import Loading from "@/components/Common/Loading/Loading";
import { findNextDueDate } from "@/helpers/installment";
import CreditCardInfo from "@/components/PaymentDetails/CreditCardInfo/CreditCardInfo";
import EmptyState from "@/components/Common/EmptyState/EmptyState";
import { Header } from "@/components/PaymentDetails/Header/Header";
import { getInfoCards, getStateCards } from "@/helpers/paymentDetails";
import NextInstallmentSection from "@/components/PaymentDetails/NextInstallmentSection/NextInstallmentSection";

const PaymentDetailsPage = () => {
  const { paymentId } = useParams();

  const { data, error, isLoading } = useSWR(paymentId, fetchPaymentDetails);

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  if (!data) return <EmptyState />;

  const {
    amount_left_to_pay,
    purchase_amount,
    payment_plan,
    customer: { card },
  } = data;

  const { formattedDate, state } = findNextDueDate(payment_plan);

  const amountCards = getInfoCards(purchase_amount, amount_left_to_pay);
  const stateCards = state ? getStateCards(state) : [];

  return (
    <div data-testid="payment-details-page">
      <BackButton />
      <Header paymentDetails={data} />

      {stateCards.map(({ title, color, className }, index) => (
        <InfoCard
          key={`status-card-${index}`}
          title={title}
          color={color}
          className={className}
        />
      ))}

      <div className="my-8 grid grid-cols-1 gap-2 lg:grid-cols-3">
        {amountCards.map(({ title, value, valueTestId, color }, index) => (
          <InfoCard
            key={`amount-card-${index}`}
            title={title}
            value={value}
            valueTestId={valueTestId}
            color={color}
            className="lg:col-span-1 lg:w-full"
          />
        ))}
      </div>

      <NextInstallmentSection date={formattedDate} />
      <CreditCardInfo card={card} state={state} />
      <div>PAYMENT PLAN WITH TABS</div>
    </div>
  );
};

export default PaymentDetailsPage;
