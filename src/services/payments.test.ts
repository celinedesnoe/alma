import { type Payments } from "@/types/payments";
import { fetchAPI } from "./payments";
import * as paymentsApi from "./payments";

let fetchMock: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  fetchMock = vi.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({ data: "mocked" }),
  } as unknown as Response);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("fetchAPI", () => {
  it("should return data when fetchAPI is successful", async () => {
    const data = await fetchAPI<Payments>("/payments");
    expect(data).toEqual({ data: "mocked" });
    expect(global.fetch).toHaveBeenCalledWith("http://localhost:3001/payments");
  });

  it("should throw an error on HTTP error response", async () => {
    fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue({ ok: false, status: 404 } as unknown as Response);

    await expect(fetchAPI<Payments>("/payments")).rejects.toThrow(
      "Failed to fetch /payments: 404 undefined",
    );
  });

  it("should throw an error on fetch rejection", async () => {
    fetchMock = vi
      .spyOn(global, "fetch")
      .mockRejectedValue(new Error("Network error"));

    await expect(fetchAPI<Payments>("/payments")).rejects.toThrow(
      "Network error",
    );
  });
});

describe("fetchPayments", () => {
  it("should call fetchAPI with /payments", async () => {
    await paymentsApi.fetchPayments();

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:3001/payments");
  });
});

describe("fetchPaymentDetails", () => {
  it("should call fetchAPI with /payments/payment_{id}", async () => {
    const id = "123";
    await paymentsApi.fetchPaymentDetails(id);

    expect(fetchMock).toHaveBeenCalledWith(
      `http://localhost:3001/payment/payment_${id}`,
    );
  });
});
