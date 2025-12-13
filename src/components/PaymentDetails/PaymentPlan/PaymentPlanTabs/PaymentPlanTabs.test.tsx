import { render, screen, fireEvent } from "@testing-library/react";
import PaymentPlanTabs from "./PaymentPlanTabs";
import { Tab } from "@/types/tabs";

describe("PaymentPlanTabs", () => {
  it("renders both tabs", () => {
    const setVisibleTab = vi.fn();

    render(<PaymentPlanTabs setVisibleTab={setVisibleTab} />);

    expect(
      screen.getByRole("button", { name: /in progress/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /history/i }),
    ).toBeInTheDocument();
  });

  it("calls setVisibleTab with 'in-progress' when In Progress tab is clicked", () => {
    const setVisibleTab = vi.fn();

    render(<PaymentPlanTabs setVisibleTab={setVisibleTab} />);

    const inProgressTab = screen.getByRole("button", { name: /in progress/i });
    fireEvent.click(inProgressTab);

    expect(setVisibleTab).toHaveBeenCalledTimes(1);
    expect(setVisibleTab).toHaveBeenCalledWith(Tab.IN_PROGRESS);
  });

  it("calls setVisibleTab with 'history' when History tab is clicked", () => {
    const setVisibleTab = vi.fn();

    render(<PaymentPlanTabs setVisibleTab={setVisibleTab} />);

    const historyTab = screen.getByRole("button", { name: /history/i });
    fireEvent.click(historyTab);

    expect(setVisibleTab).toHaveBeenCalledTimes(1);
    expect(setVisibleTab).toHaveBeenCalledWith(Tab.HISTORY);
  });
});
