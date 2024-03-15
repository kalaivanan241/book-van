import { describe, it, expect } from "vitest";
import { formatCoordinates, formatDistance, formatTime } from "./formatUtils";

describe("formatCoordinates", () => {
  it("should format coordinates correctly", () => {
    const coordinates: [string, string][] = [
      ["10", "20"],
      ["30", "40"],
      ["50", "60"],
    ];

    expect(formatCoordinates(coordinates)).toEqual([
      { lat: 10, lng: 20 },
      { lat: 30, lng: 40 },
      { lat: 50, lng: 60 },
    ]);
  });
});

describe("formatDistance", () => {
  it("should format distance in meters", () => {
    const distance = 500;
    expect(formatDistance(distance)).toBe("500 m");
  });

  it("should format distance in kilometers", () => {
    const distance = 1500;
    expect(formatDistance(distance)).toBe("1.50 km");
  });
});

describe("formatTime", () => {
  it("should format time in seconds", () => {
    const time = 30;
    expect(formatTime(time)).toBe("30 s");
  });

  it("should format time in minutes", () => {
    const time = 90;
    const result = formatTime(time);
    expect(result).toBe("1.50 min");
  });
});
