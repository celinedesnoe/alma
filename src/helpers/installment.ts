import { InstallmentState, type PaymentPlan } from "@/types/common";
import { formatUnixDate } from "@/helpers/date";

export const findNextDueDate = (
  paymentPlan: PaymentPlan[],
): {
  formattedDate: string | null;
  state: InstallmentState | null;
} => {
  if (!paymentPlan || paymentPlan.length === 0) {
    return { formattedDate: null, state: null };
  }

  // We prioritize finding installments in this order:
  // 1. Late installments — most urgent to show
  // 2. Pending installments — upcoming payments
  // 3. Paid installments — meaning all others are settled
  const priorityStates = [
    InstallmentState.LATE,
    InstallmentState.PENDING,
    InstallmentState.PAID,
  ];

  for (const state of priorityStates) {
    const plan = paymentPlan.find((i) => i.state === state);
    if (plan) {
      return {
        formattedDate: formatUnixDate(plan.due_date),
        state,
      };
    }
  }

  return { formattedDate: null, state: null };
};
