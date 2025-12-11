export const formatCurrency = (value: number): string => {
  return value.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
};
