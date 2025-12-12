import { InstallmentState } from "@/types/common";

interface StatusMessage {
  state: InstallmentState | null;
  date: string | null;
}

const StateMessage = ({ state, date }: StatusMessage) => {
  const isPending = state === InstallmentState.PENDING;
  const isLate = state === InstallmentState.LATE;
  const isPaid = state === InstallmentState.PAID;

  if (!date || !state) return;

  if (isLate)
    return (
      <p data-testid="late-state-message" className="text-sm text-red-700">
        Your next installment was {date}
      </p>
    );

  if (isPending)
    return (
      <p data-testid="pending-state-message" className="text-sm text-gray-700">
        Your next installment is {date}
      </p>
    );

  if (isPaid)
    return (
      <p data-testid="paid-state-message" className="text-sm text-green-700">
        You have paid all installments!
      </p>
    );

  return null;
};

export default StateMessage;
