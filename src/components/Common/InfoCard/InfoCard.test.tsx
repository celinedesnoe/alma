import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import InfoCard from "./InfoCard";

describe("InfoCard", () => {
  it("should render the title and content with default color", () => {
    const title = "Test Title";
    const value = "1200";

    render(<InfoCard title={title} value={value} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(value)).toBeInTheDocument();
    expect(screen.getByTestId("info-card")).toHaveClass("bg-orange-100");
  });

  it("should apply custom class names if provided", () => {
    const title = "Test Title";
    const value = "1200";
    const customClass = "custom-class";

    render(<InfoCard title={title} value={value} className={customClass} />);

    expect(screen.getByTestId("info-card")).toHaveClass(customClass);
  });

  it("should apply testId if provided", () => {
    const title = "Test Title";
    const value = "1200";
    const testId = "test-id";

    render(<InfoCard title={title} value={value} valueTestId={testId} />);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it("should apply color if provided", () => {
    const title = "Test Title";
    const value = "1200";
    const color = "bg-green-100";

    render(<InfoCard title={title} value={value} color={color} />);

    expect(screen.getByTestId("info-card")).toHaveClass(color);
  });
});
