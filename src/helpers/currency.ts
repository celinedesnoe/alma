/* eslint-disable no-irregular-whitespace */
/**
 * Formats a number as a currency string in Euros.
 *
 * @param value - The numeric value to format (e.g., 1000)
 * @returns A string representing the value as currency (e.g., "1 000,00 €")
 */
export const formatCurrency = (value: number): string => {
  return value.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
};
