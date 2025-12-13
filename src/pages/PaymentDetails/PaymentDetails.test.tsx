import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import PaymentDetailsPage from "@/pages/PaymentDetails/PaymentDetailsPage";
import { renderWithRouter } from "@/utils/testUtils";
import { paymentDetailsFixture } from "@/fixtures/payment_details";
import useSWR from "swr";

vi.mock("swr");

const mockUseSWR = vi.mocked(useSWR);

const defaultUseSWRState = {
  data: paymentDetailsFixture,
  error: null,
  isLoading: false,
  isValidating: false,
  mutate: () => Promise.resolve(undefined),
  revalidate: () => Promise.resolve(true),
};

describe("PaymentDetailsPage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should render nothing if no data", async () => {
    mockUseSWR.mockReturnValue({
      ...defaultUseSWRState,
      data: null,
    });

    renderWithRouter(<PaymentDetailsPage />, ["/payments/123"]);

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();

    expect(
      screen.queryByTestId("payment-details-page"),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  });

  it("should display a loading state while fetching payment details", async () => {
    mockUseSWR.mockReturnValue({
      ...defaultUseSWRState,
      isLoading: true,
    });
    renderWithRouter(<PaymentDetailsPage />, ["/payments/123"]);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("should display payment details when fetch is successful", async () => {
    mockUseSWR.mockReturnValue(defaultUseSWRState);

    renderWithRouter(<PaymentDetailsPage />, ["/payments/123"]);

    expect(screen.getByTestId("payment-details-page")).toBeInTheDocument();
    expect(screen.getByTestId("payment-details-header")).toBeInTheDocument();
    expect(screen.getByTestId("next-installment")).toBeInTheDocument();
    expect(screen.getByTestId("creditcard-info")).toBeInTheDocument();
    expect(screen.getByTestId("payment-plan")).toBeInTheDocument();
  });

  it("should display an error message when fetch fails", async () => {
    mockUseSWR.mockReturnValue({
      ...defaultUseSWRState,
      error: new Error("Error"),
    });

    renderWithRouter(<PaymentDetailsPage />, ["/payments/123"]);

    expect(screen.getByTestId("error")).toBeInTheDocument();
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});
