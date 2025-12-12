import type { InfoCardProps } from "@/components/Common/InfoCard/InfoCard";
import { formatCurrency } from "@/helpers/currency";
import { InstallmentState } from "@/types/common";

/**
 * Generates an array of information cards for displaying purchase details.
 *
 * @param purchaseAmount - The total purchase amount.
 * @param amountLeftToPay - The remaining amount left to pay.
 * @returns An array of `InfoCardProps` objects, each representing a card with title, value, and optional styling.
 */
export const getInfoCards = (
  purchaseAmount: number,
  amountLeftToPay: number,
): InfoCardProps[] => [
  {
    title: "Your purchase amount:",
    value: formatCurrency(purchaseAmount),
    valueTestId: "purchase-amount",
    color: "bg-gray-200",
  },
  {
    title: "Your amount left to pay:",
    value: formatCurrency(amountLeftToPay),
    valueTestId: "amount-left-to-pay",
  },
];

/**
 * Generates an array of state cards based on the current installment state.
 *
 * @param state - The current state of the installment (e.g., LATE, PAID).
 * @returns An array of `InfoCardProps` objects, each representing a status card.
 *          If the state is `LATE`, a red card is returned.
 *          If the state is `PAID`, a green card is returned.
 *          If neither condition is met, an empty array is returned.
 */
export const getStateCards = (state: InstallmentState): InfoCardProps[] => {
  const isLate = state === InstallmentState.LATE;
  const isPaid = state === InstallmentState.PAID;

  return [
    isLate && {
      title: "You have a late installment",
      color: "bg-red-100",
      className: "mt-8",
    },
    isPaid && {
      title: "You have paid all installments",
      color: "bg-green-100",
      className: "mt-8",
    },
  ].filter(Boolean) as InfoCardProps[];
};
