import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StateMessage from "./StateMessage";
import { InstallmentState } from "@/types/common";

describe("StateMessage", () => {
  it("should display a late message if state is LATE", () => {
    render(
      <StateMessage date="January 1, 2023" state={InstallmentState.LATE} />,
    );

    const installmentText = screen.getByText(
      "Your next installment was January 1, 2023",
    );

    expect(installmentText).toBeInTheDocument();
    expect(installmentText).toHaveClass("text-red-700");
  });

  it("should display the next installment date if state is PENDING", () => {
    render(
      <StateMessage date="January 1, 2023" state={InstallmentState.PENDING} />,
    );

    const installmentText = screen.getByText(
      "Your next installment is January 1, 2023",
    );

    expect(installmentText).toBeInTheDocument();
    expect(installmentText).toHaveClass("text-gray-700");
  });

  it("should display a paid message if state is PAID", () => {
    render(
      <StateMessage date="January 1, 2023" state={InstallmentState.PAID} />,
    );

    const installmentText = screen.getByText("You have paid all installments!");

    expect(installmentText).toBeInTheDocument();
    expect(installmentText).toHaveClass("text-green-700");
  });

  it("should display nothing if state is unkown from Enum", () => {
    render(
      <StateMessage date={null} state={"in_progress" as InstallmentState} />,
    );
  });

  it("should display nothing if both date and state are null", () => {
    render(<StateMessage date={null} state={null} />);
  });

  it("should display nothing if date only is null", () => {
    render(<StateMessage date={null} state={null} />);
  });

  it("should display nothing if state only is null", () => {
    render(<StateMessage date={null} state={null} />);
  });
});
