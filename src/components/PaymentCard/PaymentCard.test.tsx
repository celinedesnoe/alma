import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PaymentCard from "./PaymentCard";
import * as installment from "@/helpers/installment";
import { paymentFixture } from "@/fixtures/payments";
import { formatCurrency } from "@/helpers/currency";
import { InstallmentState } from "@/types/common";
import { normalizeSpaces } from "@/utils/testUtils";

describe("PaymentCard", () => {
  it("should display the merchant name, formatted purchase amount and have correct href", () => {
    render(<PaymentCard payment={paymentFixture} />);

    expect(screen.getByTestId("payment-card")).toHaveAttribute(
      "href",
      `/payments/${paymentFixture.id}`,
    );
    expect(
      screen.getByText(paymentFixture.merchant_display_name),
    ).toBeInTheDocument();

    const amount = normalizeSpaces(
      formatCurrency(paymentFixture.purchase_amount),
    );
    expect(screen.getByTestId("payment-amount")).toHaveTextContent(amount);
  });

  it("should display the state message", () => {
    vi.spyOn(installment, "findNextDueDate").mockReturnValue({
      formattedDate: "January 1, 2023",
      state: InstallmentState.LATE,
    });

    render(<PaymentCard payment={paymentFixture} />);
    expect(screen.getByTestId("late-state-message")).toBeInTheDocument();
  });

  it("should display the default logo if no logo_url is provided", () => {
    vi.spyOn(installment, "findNextDueDate").mockReturnValue({
      formattedDate: null,
      state: null,
    });

    render(
      <PaymentCard
        payment={{
          ...paymentFixture,
          logo_url: null,
        }}
      />,
    );

    const logo = screen.getByRole("presentation");
    expect(logo).toHaveAttribute("src", "/logo.svg");
  });
});
