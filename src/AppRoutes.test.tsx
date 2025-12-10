import { screen } from "@testing-library/react";

import { renderWithRouter } from "@/utils/testUtils";

import * as paymentsApi from "@/services/payments";
import { paymentsFixture } from "./fixtures/payments";
import { paymentDetailsFixture } from "./fixtures/payment_details";
import useSWR from "swr";

jest.spyOn(paymentsApi, "fetchPayments").mockResolvedValue(paymentsFixture);
jest
  .spyOn(paymentsApi, "fetchPaymentDetails")
  .mockResolvedValue(paymentDetailsFixture);

jest.mock("swr");

const mockUseSWR = jest.mocked(useSWR);

const defaultUseSWRState = {
  data: null,
  error: null,
  isLoading: false,
  isValidating: false,
  mutate: () => Promise.resolve(undefined),
  revalidate: () => Promise.resolve(true),
};

describe("Router tests", () => {
  test("redirects / to /payments", () => {
    mockUseSWR.mockReturnValue({
      ...defaultUseSWRState,
      data: paymentsFixture,
    });

    renderWithRouter(["/"]);
    expect(screen.getByTestId("payments-page")).toBeInTheDocument();
  });

  test("/payments renders PaymentsPage", () => {
    mockUseSWR.mockReturnValue({
      ...defaultUseSWRState,
      data: paymentsFixture,
    });

    renderWithRouter(["/payments"]);
    expect(screen.getByTestId("payments-page")).toBeInTheDocument();
  });

  test("/payments/:paymentId renders PaymentDetailsPage", () => {
    mockUseSWR.mockReturnValue({
      ...defaultUseSWRState,
      data: paymentDetailsFixture,
    });

    renderWithRouter(["/payments/123"]);
    expect(screen.getByTestId("payment-details-page")).toBeInTheDocument();
  });

  test("/403 renders ForbiddenPage", () => {
    renderWithRouter(["/403"]);
    expect(screen.getByTestId("forbidden-page")).toBeInTheDocument();
  });

  test("unknown route renders NotFoundPage", () => {
    renderWithRouter(["/some/random/path"]);
    expect(screen.getByTestId("not-found-page")).toBeInTheDocument();
  });
});
