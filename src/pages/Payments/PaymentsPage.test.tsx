import { render, screen, waitFor } from "@testing-library/react";
import PaymentsPage from "@/pages/Payments/PaymentsPage";

import { paymentsFixture } from "@/fixtures/payments";
import useSWR from "swr";

vi.mock("swr");

const mockUseSWR = vi.mocked(useSWR);

const defaultUseSWRState = {
  data: paymentsFixture,
  error: null,
  isLoading: false,
  isValidating: false,
  mutate: () => Promise.resolve(undefined),
  revalidate: () => Promise.resolve(true),
};

describe("PaymentsPage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should render nothing if no data", async () => {
    mockUseSWR.mockReturnValue({
      ...defaultUseSWRState,
      data: null,
    });

    render(<PaymentsPage />);

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();

    expect(screen.queryByTestId("payments-page")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  });

  it("should display a loading state while fetching payments", async () => {
    mockUseSWR.mockReturnValue({
      ...defaultUseSWRState,
      isLoading: true,
    });

    render(<PaymentsPage />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("should display payments when fetch is successful", async () => {
    mockUseSWR.mockReturnValue(defaultUseSWRState);

    render(<PaymentsPage />);

    expect(screen.getByTestId("payments-page")).toBeInTheDocument();

    expect(screen.getByTestId("total-amount-left-to-pay")).toHaveTextContent(
      "45 000,00 €",
    );
    expect(screen.getByTestId("payments-page")).toBeInTheDocument();
    expect(screen.getAllByTestId("payment-card")).toHaveLength(
      paymentsFixture.payments.length,
    );
  });

  it("should display an error message when fetch fails", async () => {
    mockUseSWR.mockReturnValue({
      ...defaultUseSWRState,
      error: new Error("Error"),
    });

    render(<PaymentsPage />);

    await waitFor(() => {
      expect(screen.getByTestId("error")).toBeInTheDocument();
      expect(screen.getByText("Error")).toBeInTheDocument();
    });
  });
});
