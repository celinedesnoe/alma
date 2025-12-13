import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { paymentDetailsFixture } from "@/fixtures/payment_details";
import { formatUnixDate } from "@/helpers/date";

describe("Header", () => {
  it("should render the payment details correctly", () => {
    const { logo_url, merchant_display_name, created, id } =
      paymentDetailsFixture;

    render(<Header paymentDetails={paymentDetailsFixture} />);

    expect(
      screen.getByRole("heading", { name: "Your payment detail" }),
    ).toBeInTheDocument();

    const logo = screen.getByRole("presentation");
    expect(logo).toHaveAttribute("src", logo_url);
    expect(logo).toHaveAttribute("alt", "");

    expect(screen.getByText(merchant_display_name)).toBeInTheDocument();

    expect(
      screen.getByText(`Purchased on ${formatUnixDate(created)}`),
    ).toBeInTheDocument();

    expect(screen.getByText(`id: ${id}`)).toBeInTheDocument();
  });

  it("should use the default logo if logo_url is null", () => {
    render(
      <Header
        paymentDetails={{
          ...paymentDetailsFixture,
          logo_url: null,
        }}
      />,
    );

    const logo = screen.getByRole("presentation");
    expect(logo).toHaveAttribute("src", "/logo.svg");
  });
});
