/**
 * Converts a UNIX timestamp to a readable date string.
 *
 * @param timestamp - The UNIX timestamp in seconds (e.g., 1699999999)
 * @returns A string representing the date in the format "day month year"
 *          Example: "December 11, 2025"
 */
export const formatUnixDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Pads month with a leading zero if it's a single digit (1-9),
 * but leaves already padded or two-digit months untouched.
 * @param month - number or string representing the month
 * @returns string with leading zero if needed
 */
export const padMonth = (month: number | string): string => {
  const m = typeof month === "number" ? month : parseInt(month, 10);

  if (m >= 1 && m <= 9) {
    return `0${m}`;
  }

  return typeof month === "string" && month.length === 2 ? month : `${m}`;
};
