import { screen } from "@testing-library/react";

import { renderWithRouter } from "@/utils/testUtils";

import * as paymentsApi from "@/services/payments";
import { paymentsFixture } from "./fixtures/payments";
import { paymentDetailsFixture } from "./fixtures/payment_details";
import useSWR from "swr";
import { AppRoutes } from "./AppRoutes";

vi.spyOn(paymentsApi, "fetchPayments").mockResolvedValue(paymentsFixture);
vi.spyOn(paymentsApi, "fetchPaymentDetails").mockResolvedValue(
  paymentDetailsFixture,
);

vi.mock("swr");

const mockUseSWR = vi.mocked(useSWR);

const defaultUseSWRState = {
  data: null,
  error: null,
  isLoading: false,
  isValidating: false,
  mutate: () => Promise.resolve(undefined),
  revalidate: () => Promise.resolve(true),
};

describe("Router tests", () => {
  it("redirects / to /payments", () => {
    mockUseSWR.mockReturnValue({
      ...defaultUseSWRState,
      data: paymentsFixture,
    });

    renderWithRouter(<AppRoutes />, ["/"]);
    expect(screen.getByTestId("payments-page")).toBeInTheDocument();
  });

  it("/payments renders PaymentsPage", () => {
    mockUseSWR.mockReturnValue({
      ...defaultUseSWRState,
      data: paymentsFixture,
    });

    renderWithRouter(<AppRoutes />, ["/payments"]);
    expect(screen.getByTestId("payments-page")).toBeInTheDocument();
  });

  it("/payments/:paymentId renders PaymentDetailsPage", () => {
    mockUseSWR.mockReturnValue({
      ...defaultUseSWRState,
      data: paymentDetailsFixture,
    });

    renderWithRouter(<AppRoutes />, ["/payments/123"]);
    expect(screen.getByTestId("payment-details-page")).toBeInTheDocument();
  });

  it("/403 renders ForbiddenPage", () => {
    renderWithRouter(<AppRoutes />, ["/403"]);
    expect(screen.getByTestId("forbidden-page")).toBeInTheDocument();
  });

  it("unknown route renders NotFoundPage", () => {
    renderWithRouter(<AppRoutes />, ["/some/random/path"]);
    expect(screen.getByTestId("not-found-page")).toBeInTheDocument();
  });
});
