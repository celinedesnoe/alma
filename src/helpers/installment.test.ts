import { describe, it, expect } from "vitest";
import { findNextDueDate } from "./installment";
import { InstallmentState, type PaymentPlan } from "@/types/common";
import { paymentPlanFixture } from "@/fixtures/payment_details";
import { formatUnixDate } from "./date";

describe("findNextDueDate", () => {
  it("should return null for empty payment plans", () => {
    const result = findNextDueDate([]);
    expect(result).toEqual({ formattedDate: null, state: null });
  });

  it("should return the first LATE installment", () => {
    const paymentPlan: PaymentPlan[] = [
      {
        ...paymentPlanFixture,
        due_date: 1672531200,
        state: InstallmentState.LATE,
      },
      {
        ...paymentPlanFixture,
        due_date: 1672617600,
        state: InstallmentState.LATE,
      },
      {
        ...paymentPlanFixture,
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
    const paymentPlan: PaymentPlan[] = [
      {
        ...paymentPlanFixture,
        due_date: 1672531200,
        state: InstallmentState.PENDING,
      },
      {
        ...paymentPlanFixture,
        due_date: 1672531201,
        state: InstallmentState.PENDING,
      },
      {
        ...paymentPlanFixture,
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
    const paymentPlan: PaymentPlan[] = [
      {
        ...paymentPlanFixture,
        due_date: 1672704000,
        state: InstallmentState.PAID,
      },
      {
        ...paymentPlanFixture,
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
    const paymentPlan: PaymentPlan[] = [];

    const result = findNextDueDate(paymentPlan);
    expect(result).toEqual({ formattedDate: null, state: null });
  });
});
