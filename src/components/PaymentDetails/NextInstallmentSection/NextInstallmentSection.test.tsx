import { render, screen } from "@testing-library/react";
import NextInstallmentSection from "./NextInstallmentSection";

describe("NextInstallmentSection", () => {
  it("should render the section with the provided date", () => {
    const date = "January 1, 2023";

    render(<NextInstallmentSection date={date} />);

    expect(screen.getByText("Your next installment")).toBeInTheDocument();

    expect(
      screen.getByText(/you will be withdrawn automatically on/i),
    ).toBeInTheDocument();
    expect(screen.getByText(date)).toBeInTheDocument();
    expect(screen.getByText(date)).toHaveClass("text-orange-600");
  });

  it("should not render anything if no date is provided", () => {
    const { container } = render(<NextInstallmentSection date={null} />);

    expect(container.firstChild).toBeNull();
  });
});
