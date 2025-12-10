import { screen } from "@testing-library/react";

import { renderWithRouter } from "@/utils/testUtils";

import * as paymentsApi from "@/services/payments";
import { paymentsFixture } from "./fixtures/payments";
import { paymentDetailsFixture } from "./fixtures/payment_details";

jest.spyOn(paymentsApi, "fetchPayments").mockResolvedValue(paymentsFixture);
jest
  .spyOn(paymentsApi, "fetchPaymentDetails")
  .mockResolvedValue(paymentDetailsFixture);

describe("Router tests", () => {
  test("redirects / to /payments", () => {
    renderWithRouter(["/"]);
    expect(screen.getByTestId("payments-page")).toBeInTheDocument();
  });

  test("/payments renders PaymentsPage", () => {
    renderWithRouter(["/payments"]);
    expect(screen.getByTestId("payments-page")).toBeInTheDocument();
  });

  test("/payments/:paymentId renders PaymentDetailsPage", () => {
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
