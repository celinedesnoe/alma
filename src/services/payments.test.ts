import { State, type Payments } from "../types/payments";
import { fetchAPI } from "./payments";
import * as paymentsApi from "./payments";

describe("fetchAPI", () => {
  const mockPayments: Payments = {
    id: "payment_1",
    created: 123456,
    state: State.IN_PROGRESS,
    origin: "online_in_page",
    integration_origin: null,
    locale: "fr",
    country_of_service: "FR",
    payment_plan: [],
    purchase_amount: 1000,
    fees: { customer: { total: 0, total_excluding_tax: 0, tax: 0 } },
    customer_interest: 0,
    amount_left_to_pay: 1000,
    annual_interest_rate: null,
    deferred_days: 0,
    deferred_months: 0,
    deferred_trigger: false,
    deferred_trigger_applied: null,
    deferred_trigger_description: null,
    is_deferred_capture: false,
    merchant_id: "merchant_1",
    merchant_brand: "brand",
    merchant_display_name: "display",
    merchant_name: "name",
    merchant_website: null,
    merchant_email: [],
    merchant_phone: null,
    customer: {
      id: "customer_1",
      card: {
        id: "card_1",
        brand: "visa",
        iin: "400000",
        country: "FR",
        created: 123456,
        exp_month: 1,
        exp_year: 2030,
        last4: "0003",
        verified: true,
        psp: "stripe",
        psp_representations: {
          stripe_sca: {
            customer_id: "cus_123",
            payment_method_id: "pm_123",
          },
        },
      },
      cards: [],
      payment_methods: [],
    },
    recovery: null,
    refunds: [],
    requirements: [],
    preferred_payment_method: "card",
    payment_method_providers: { card: "stripe" },
    orders: [],
    return_url: "http://example.com",
    logo_url: "http://example.com/logo.png",
    checkout_ab_tests: [],
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return data when fetchAPI is successful", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockPayments),
    });

    const data = await fetchAPI<Payments>("/payments");
    expect(data).toEqual(mockPayments);
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:3001/payments");
  });

  it("should throw an error on HTTP error response", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
    });

    await expect(fetchAPI<Payments>("/payments")).rejects.toThrow(
      "HTTP error! status: 404"
    );
  });

  it("should throw an error on fetch rejection", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    await expect(fetchAPI<Payments>("/payments")).rejects.toThrow(
      "Network error"
    );
  });
});

describe("fetchPayments", () => {
  it("should call fetchAPI with /payments", async () => {
    const spy = jest
      .spyOn(paymentsApi, "fetchAPI")
      .mockResolvedValue({} as Payments);

    await paymentsApi.fetchPayments();

    expect(spy).toHaveBeenCalledWith("/payments");

    spy.mockRestore();
  });
});

describe("fetchPaymentDetails", () => {
  it("should call fetchAPI with /payments/payment_{id}", async () => {
    const spy = jest
      .spyOn(paymentsApi, "fetchAPI")
      .mockResolvedValue({} as Payments);

    const id = "123";
    await paymentsApi.fetchPaymentDetails(id);

    expect(spy).toHaveBeenCalledWith(`/payments/payment_${id}`);

    spy.mockRestore();
  });
});
