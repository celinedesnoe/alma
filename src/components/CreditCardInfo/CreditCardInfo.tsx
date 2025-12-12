import { padMonth } from "@/helpers/date";
import { InstallmentState } from "@/types/common";
import type { PaymentDetailCard } from "@/types/payment";

interface CreditCardInfoProps {
  card: PaymentDetailCard | null;
  state: InstallmentState | null;
}

const CreditCardInfo = ({ card, state }: CreditCardInfoProps) => {
  if (!card) return;

  const isPaid = state === InstallmentState.PAID;
  const description = isPaid
    ? "You have used the card "
    : "You will be withdraw automatically on: ";

  return (
    <div
      data-testid="creditcard-info"
      className="rounded border border-gray-100 px-4 py-4 shadow-md"
    >
      <h2 className="mb-4 text-xl font-semibold">Your payment method</h2>
      <div>
        <p className="mb-4">{description}</p>
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
  );
};

export default CreditCardInfo;
