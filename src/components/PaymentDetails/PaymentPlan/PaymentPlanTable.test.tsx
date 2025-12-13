import { render, screen, fireEvent, within } from "@testing-library/react";
import PaymentPlanTable from "./PaymentPlanTable";
import { InstallmentState, type PaymentPlan } from "@/types/common";
import {
  paymentPlanFixture,
  paymentPlanListFixture,
} from "@/fixtures/payment_details";

describe("PaymentPlanTable", () => {
  it("renders title and passes in-progress installments by default", () => {
    render(<PaymentPlanTable paymentPlan={paymentPlanListFixture} />);

    expect(screen.getByTestId("payment-plan")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Your payment plan" }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("payment-plan-tabs")).toBeInTheDocument();
    expect(screen.getByTestId("payment-plan-tab-content")).toBeInTheDocument();

    const tabContent = screen.getByTestId("payment-plan-tab-content");

    expect(
      within(tabContent).getAllByTestId("installment-state"),
    ).not.toHaveTextContent(InstallmentState.PAID);
  });

  it("shows only paid installments when History tab is clicked", () => {
    render(<PaymentPlanTable paymentPlan={paymentPlanListFixture} />);

    const historyTab = screen.getByRole("button", { name: /history/i });
    fireEvent.click(historyTab);

    const tabContent = screen.getByTestId("payment-plan-tab-content");

    expect(
      within(tabContent).getAllByTestId("installment-state"),
    ).toHaveTextContent(InstallmentState.PAID);
  });

  it("shows empty message when tab has no installments", () => {
    // No PAID installment leads to empty History tab
    const onlyInProgress: PaymentPlan[] = [
      { ...paymentPlanFixture, state: InstallmentState.PENDING },
    ];

    render(<PaymentPlanTable paymentPlan={onlyInProgress} />);

    const historyTab = screen.getByRole("button", { name: /history/i });
    fireEvent.click(historyTab);

    expect(screen.getByTestId("empty-payment-plan")).toBeInTheDocument();
  });
});
