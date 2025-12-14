import { findNextDueDate, getInstallmentStyles } from "./installment";
import { InstallmentState, type PaymentPlan } from "@/types/common";
import { installmentFixture } from "@/fixtures/payment_details";
import { formatUnixDate } from "./date";

describe("findNextDueDate", () => {
  it("should return null for empty payment plans", () => {
    const result = findNextDueDate([]);
    expect(result).toEqual({ formattedDate: null, state: null });
  });

  it("should return the first LATE installment", () => {
    const paymentPlan: PaymentPlan = [
      {
        ...installmentFixture,
        due_date: 1672531200,
        state: InstallmentState.LATE,
      },
      {
        ...installmentFixture,
        due_date: 1672617600,
        state: InstallmentState.LATE,
      },
      {
        ...installmentFixture,
        due_date: 1672704000,
        state: InstallmentState.PENDING,
      },
    ];

    const result = findNextDueDate(paymentPlan);
    expect(result).toEqual({
      formattedDate: formatUnixDate(1672531200),
      state: InstallmentState.LATE,
    });
  });

  it("should return the first PENDING installment if no LATE installment exists", () => {
    const paymentPlan: PaymentPlan = [
      {
        ...installmentFixture,
        due_date: 1672531200,
        state: InstallmentState.PENDING,
      },
      {
        ...installmentFixture,
        due_date: 1672531201,
        state: InstallmentState.PENDING,
      },
      {
        ...installmentFixture,
        due_date: 1672704000,
        state: InstallmentState.PAID,
      },
    ];

    const result = findNextDueDate(paymentPlan);
    expect(result).toEqual({
      formattedDate: formatUnixDate(1672531200),
      state: InstallmentState.PENDING,
    });
  });

  it("should return the first PAID installment if no LATE or PENDING installment exists", () => {
    const paymentPlan: PaymentPlan = [
      {
        ...installmentFixture,
        due_date: 1672704000,
        state: InstallmentState.PAID,
      },
      {
        ...installmentFixture,
        due_date: 1672704001,
        state: InstallmentState.PAID,
      },
    ];

    const result = findNextDueDate(paymentPlan);
    expect(result).toEqual({
      formattedDate: formatUnixDate(1672704000),
      state: InstallmentState.PAID,
    });
  });

  it("should return null if no valid installment exists", () => {
    const paymentPlan: PaymentPlan = [];

    const result = findNextDueDate(paymentPlan);
    expect(result).toEqual({ formattedDate: null, state: null });
  });
});

describe("getInstallmentStyles", () => {
  it("returns styles for LATE installments", () => {
    const styles = getInstallmentStyles(InstallmentState.LATE);

    expect(styles).toEqual({
      bg: "bg-red-50",
      badgeClass: "ml-4 rounded bg-red-800 p-1 text-xs text-white",
      badgeLabel: "LATE",
    });
  });

  it("returns styles for PAID installments", () => {
    const styles = getInstallmentStyles(InstallmentState.PAID);

    expect(styles).toEqual({
      bg: "bg-green-50",
      badgeClass: "ml-4 rounded bg-green-800 p-1 text-xs text-white",
      badgeLabel: "PAID",
    });
  });

  it("returns styles for PENDING installments", () => {
    const styles = getInstallmentStyles(InstallmentState.PENDING);

    expect(styles).toEqual({
      bg: "bg-orange-50",
      badgeClass: "",
      badgeLabel: null,
    });
  });
});
