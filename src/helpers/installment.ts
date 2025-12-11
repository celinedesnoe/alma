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

  // For each paymentPlan, we want to find in this order the installment with
  // 1. Late state (even if the date is in the past)
  // 2. Pending state (which would mean there is no late state before)
  // 3. Paid state (which would mean there is no late or pending state before)
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
