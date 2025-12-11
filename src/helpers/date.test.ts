import { formatUnixDate } from "./date";

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
