import { formatCurrency } from "./currency";
import { getInfoCards, getStateCards } from "./paymentDetails";
import { InstallmentState } from "@/types/common";

describe("getInfoCards", () => {
  it("should generate info cards with the correct titles and values", () => {
    const purchaseAmount = 1000;
    const amountLeftToPay = 500;

    const result = getInfoCards(purchaseAmount, amountLeftToPay);

    expect(result).toHaveLength(2);

    expect(result[0]).toEqual({
      title: "Your purchase amount:",
      value: formatCurrency(purchaseAmount),
      valueTestId: "purchase-amount",
      color: "bg-gray-200",
    });

    expect(result[1]).toEqual({
      title: "Your amount left to pay:",
      value: formatCurrency(amountLeftToPay),
      valueTestId: "amount-left-to-pay",
    });
  });
});

describe("getStateCards", () => {
  it("should return a red card when the state is LATE", () => {
    const result = getStateCards(InstallmentState.LATE);

    expect(result).toHaveLength(1);

    expect(result[0]).toEqual({
      title: "You have a late installment",
      color: "bg-red-100",
      className: "mt-8",
    });
  });

  it("should return a green card when the state is PAID", () => {
    const result = getStateCards(InstallmentState.PAID);

    expect(result).toHaveLength(1);

    expect(result[0]).toEqual({
      title: "You have paid all installments",
      color: "bg-green-100",
      className: "mt-8",
    });
  });

  it("should return an empty array when the state is neither LATE nor PAID", () => {
    const result = getStateCards(InstallmentState.PENDING);

    expect(result).toHaveLength(0);
  });
});
