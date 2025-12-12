import { InstallmentState, type PaymentPlan } from "@/types/common";
import { formatUnixDate } from "@/helpers/date";

/**
 * Finds the next due installment from a payment plan based on priority.
 *
 * Priority order:
 *   1. Late installments
 *   2. Pending installments
 *   3. Paid installments
 *
 * @param paymentPlan - An array of installments
 * @returns An object containing:
 *   - formattedDate: the due date of the next installment (formatted as a string) or null if none
 *   - state: the state of the next installment or null if none
 */
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
