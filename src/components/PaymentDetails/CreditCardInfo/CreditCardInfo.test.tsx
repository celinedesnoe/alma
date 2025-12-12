import { render, screen } from "@testing-library/react";
import CreditCardInfo from "./CreditCardInfo";
import { InstallmentState } from "@/types/common";
import { padMonth } from "@/helpers/date";
import { paymentCardFixture } from "@/fixtures/payment_details";

describe("CreditCardInfo", () => {
  it("should render the card information when card is provided", () => {
    const { brand, last4, exp_year, exp_month } = paymentCardFixture;

    const cardText = `${brand.toLocaleUpperCase()} - ${last4}`;
    const paddedMonth = padMonth(exp_month);

    render(
      <CreditCardInfo
        card={paymentCardFixture}
        state={InstallmentState.PENDING}
      />,
    );

    expect(screen.getByTestId("creditcard-info")).toBeInTheDocument();
    expect(screen.getByText(cardText)).toBeInTheDocument();
    expect(screen.getByText(`${paddedMonth}/${exp_year}`)).toBeInTheDocument();
  });

  it("should display the correct description when state is PAID", () => {
    render(
      <CreditCardInfo
        card={paymentCardFixture}
        state={InstallmentState.PAID}
      />,
    );

    expect(screen.getByText("You have used the card")).toBeInTheDocument();
  });

  it("should display the correct description when state is not PAID", () => {
    render(
      <CreditCardInfo
        card={paymentCardFixture}
        state={InstallmentState.PENDING}
      />,
    );

    expect(
      screen.getByText("You will be withdraw automatically on:"),
    ).toBeInTheDocument();
  });

  it("should not render anything if no card is provided", () => {
    const { container } = render(
      <CreditCardInfo card={null} state={InstallmentState.PENDING} />,
    );

    expect(container.firstChild).toBeNull();
  });
});
