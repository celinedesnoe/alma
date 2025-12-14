import { render, screen } from "@testing-library/react";

import PaymentPlanTabsContent from "./PaymentPlanTabsContent";
import { type PaymentPlan } from "@/types/common";
import { installmentFixture } from "@/fixtures/payment_details";
import { formatUnixDateToMMDDYYYY } from "@/helpers/date";
import { formatCurrency } from "@/helpers/currency";
import { getInstallmentStyles } from "@/helpers/installment";
import { normalizeSpaces } from "@/utils/testUtils";

describe("PaymentPlanTabsContent", () => {
  it("renders 'No installments' when list is empty", () => {
    render(<PaymentPlanTabsContent paymentPlan={[]} />);

    expect(screen.getByText("No installments")).toBeInTheDocument();
  });

  it("renders a list item for each installment", () => {
    const paymentPlan: PaymentPlan = [installmentFixture, installmentFixture];

    render(<PaymentPlanTabsContent paymentPlan={paymentPlan} />);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(paymentPlan.length);

    paymentPlan.forEach(({ due_date, purchase_amount, state }, index) => {
      const { bg, badgeClass, badgeLabel } = getInstallmentStyles(state);

      expect(screen.getAllByTestId("installment")[index]).toHaveClass(bg);
      expect(
        screen.getAllByText(formatUnixDateToMMDDYYYY(due_date))[index],
      ).toBeInTheDocument();

      const badge = screen.getAllByTestId("installment-state")[index];
      expect(badge).toHaveTextContent(badgeLabel as string);
      expect(badge).toHaveClass(badgeClass);

      const amount = normalizeSpaces(formatCurrency(purchase_amount));
      expect(screen.getAllByText(amount)[index]).toBeInTheDocument();
    });
  });
});
