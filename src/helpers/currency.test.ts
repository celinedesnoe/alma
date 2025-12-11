import { formatCurrency } from "./currency";

describe("formatCurrency", () => {
  it("should format a number as currency in EUR", () => {
    const value = 1234.56;
    const formatted = formatCurrency(value);

    expect(formatted).toBe("1 234,56 €");
  });

  it("should handle zero correctly", () => {
    const value = 0;
    const formatted = formatCurrency(value);

    expect(formatted).toBe("0,00 €");
  });

  it("should handle negative numbers correctly", () => {
    const value = -1234.56;
    const formatted = formatCurrency(value);

    expect(formatted).toBe("-1 234,56 €");
  });
});
