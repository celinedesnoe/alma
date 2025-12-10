import { type Payments } from "@/types/payments";
import { fetchAPI } from "./payments";
import * as paymentsApi from "./payments";
import { paymentsFixture } from "@/fixtures/payments";

describe("fetchAPI", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return data when fetchAPI is successful", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(paymentsFixture),
    });

    const data = await fetchAPI<Payments>("/payments");
    expect(data).toEqual(paymentsFixture);
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

    expect(spy).toHaveBeenCalledWith(`/payment/payment_${id}`);

    spy.mockRestore();
  });
});
