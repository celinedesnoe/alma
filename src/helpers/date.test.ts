import { formatUnixDate, formatUnixDateToMMDDYYYY, padMonth } from "./date";

describe("formatUnixDate", () => {
  it("should format a UNIX timestamp to a readable date", () => {
    const timestamp = 1672531200; // January 1, 2023
    const formatted = formatUnixDate(timestamp);

    expect(formatted).toBe("January 1, 2023");
  });

  it("should handle a timestamp of 0 (epoch time)", () => {
    const timestamp = 0; // January 1, 1970
    const formatted = formatUnixDate(timestamp);

    expect(formatted).toBe("January 1, 1970");
  });

  it("should handle a negative timestamp (before epoch)", () => {
    const timestamp = -315619200; // January 1, 1960
    const formatted = formatUnixDate(timestamp);

    expect(formatted).toBe("January 1, 1960");
  });
});

describe("formatUnixDateToMMDDYYYY", () => {
  it("formats a UNIX timestamp to MM/DD/YYYY", () => {
    const ts = 1672531200;
    const result = formatUnixDateToMMDDYYYY(ts);

    expect(result).toBe("01/01/2023");
  });

  it("handles epoch (timestamp 0)", () => {
    const result = formatUnixDateToMMDDYYYY(0);
    expect(result).toBe("01/01/1970");
  });
});

describe("padMonth", () => {
  it("pads single digit numbers", () => {
    expect(padMonth(1)).toBe("01");
    expect(padMonth("2")).toBe("02");
  });

  it("keeps two-digit months as is", () => {
    expect(padMonth(11)).toBe("11");
    expect(padMonth("12")).toBe("12");
  });
});
