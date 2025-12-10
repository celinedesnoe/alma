export const formatUnixDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
