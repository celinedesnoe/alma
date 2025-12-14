import { render, screen, fireEvent } from "@testing-library/react";
import PaymentPlanTabs from "./PaymentPlanTabs";
import { Tab } from "@/types/tabs";

describe("PaymentPlanTabs", () => {
  it("renders both tabs", () => {
    const setVisibleTab = vi.fn();

    render(
      <PaymentPlanTabs
        setVisibleTab={setVisibleTab}
        visibleTab={Tab.IN_PROGRESS}
      />,
    );

    const inProgressTab = screen.getByRole("tab", { name: /in progress/i });
    const historyTab = screen.getByRole("tab", { name: /history/i });

    expect(inProgressTab).toHaveAttribute("aria-selected", "true");
    expect(historyTab).toHaveAttribute("aria-selected", "false");
  });

  it("calls setVisibleTab with 'in-progress' when In Progress tab is clicked", () => {
    const setVisibleTab = vi.fn();

    render(
      <PaymentPlanTabs
        setVisibleTab={setVisibleTab}
        visibleTab={Tab.HISTORY}
      />,
    );

    const inProgressTab = screen.getByRole("tab", { name: /in progress/i });

    fireEvent.click(inProgressTab);

    expect(setVisibleTab).toHaveBeenCalledTimes(1);
    expect(setVisibleTab).toHaveBeenCalledWith(Tab.IN_PROGRESS);
  });

  it("calls setVisibleTab with 'history' when History tab is clicked", () => {
    const setVisibleTab = vi.fn();

    render(
      <PaymentPlanTabs
        setVisibleTab={setVisibleTab}
        visibleTab={Tab.IN_PROGRESS}
      />,
    );

    const historyTab = screen.getByRole("tab", { name: /history/i });

    fireEvent.click(historyTab);

    expect(setVisibleTab).toHaveBeenCalledTimes(1);
    expect(setVisibleTab).toHaveBeenCalledWith(Tab.HISTORY);
  });
});
