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
  paymentPlan: PaymentPlan,
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

const stateStyles: Record<
  InstallmentState,
  { bg: string; badgeClass: string; badgeLabel: string | null }
> = {
  [InstallmentState.LATE]: {
    bg: "bg-red-50",
    badgeClass: "ml-4 rounded bg-red-800 p-1 text-xs text-white",
    badgeLabel: "LATE",
  },
  [InstallmentState.PAID]: {
    bg: "bg-green-50",
    badgeClass: "ml-4 rounded bg-green-800 p-1 text-xs text-white",
    badgeLabel: "PAID",
  },
  [InstallmentState.PENDING]: {
    bg: "bg-orange-50",
    badgeClass: "",
    badgeLabel: null,
  },
};

/**
 * Maps an installment state to its display styles.
 *
 * Used by UI components (e.g. payment plan rows) to keep all
 * Tailwind classes and badge labels for each InstallmentState
 * in a single place.
 *
 * @param state - Installment state (LATE, PENDING, PAID, etc.)
 * @returns An object containing:
 *  - bg: background CSS class for the row
 *  - badgeClass: optional CSS classes for the state badge
 *  - badgeLabel: optional label displayed inside the badge
 */
export const getInstallmentStyles = (state: InstallmentState) =>
  stateStyles[state];
