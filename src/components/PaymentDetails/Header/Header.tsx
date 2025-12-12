import { formatUnixDate } from "@/helpers/date";
import type { PaymentDetails } from "@/types/payment";

interface HeaderProps {
  paymentDetails: PaymentDetails;
}

export const Header = ({ paymentDetails }: HeaderProps) => {
  const {
    logo_url,
    merchant_display_name,
    created,
    id: paymentId,
  } = paymentDetails;

  return (
    <div data-testid="payment-details-header">
      <h1 className="mt-8 mb-8 text-3xl">Your payment detail</h1>
      <div className="flex flex-col items-center md:flex-row md:items-start">
        <div className="rounded border border-gray-100 px-4 py-4 shadow-md md:mr-8">
          <img alt="" src={logo_url ?? "/logo.svg"} width="48" height="48" />
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl">{merchant_display_name}</h2>
          <p data-testid="purchase-date">
            Purchased on {formatUnixDate(created)}
          </p>
          <div className="text-xs text-gray-500">id: {paymentId}</div>
        </div>
      </div>
    </div>
  );
};
