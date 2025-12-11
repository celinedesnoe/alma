import { formatCurrency } from "@/helpers/currency";
import { findNextDueDate } from "@/helpers/installment";
import { InstallmentState } from "@/types/common";
import type { Payment } from "@/types/payments";
interface PaymentCardProps {
  payment: Payment;
}

const PaymentCard = ({ payment }: PaymentCardProps) => {
  const { logo_url, merchant_display_name, payment_plan, purchase_amount, id } =
    payment;

  const { formattedDate, state } = findNextDueDate(payment_plan);

  const isPending = state === InstallmentState.PENDING;
  const isLate = state === InstallmentState.LATE;
  const isPaid = state === InstallmentState.PAID;

  return (
    <a
      className="mb-8 flex w-full cursor-pointer items-center rounded-md border border-gray-100 px-4 py-4 shadow-md hover:bg-gray-200"
      href={`/payments/${id}`}
      data-testid="payment-card"
    >
      <div className="mr-8">
        <img alt="" src={logo_url ?? "./logo.svg"} width="48" height="48" />
      </div>
      <div className="w-full">
        <div className="text-black-900 mb-4 flex flex-col justify-between md:flex-row">
          <h3 className="font-semibold">{merchant_display_name}</h3>
          <div>{formatCurrency(purchase_amount)}</div>
        </div>
        {isPending && (
          <p className="text-sm text-gray-700">
            Your next installment is {formattedDate}
          </p>
        )}
        {isLate && (
          <p className="text-sm text-red-700">
            Your next installment was {formattedDate}
          </p>
        )}
        {isPaid && (
          <p className="text-sm text-green-700">
            You have paid all installments!
          </p>
        )}
      </div>
    </a>
  );
};

export default PaymentCard;
