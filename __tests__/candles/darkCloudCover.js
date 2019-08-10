const { readFileSync } = require("fs");

const { isDarkCloudCover: pattern } = require("../../build/candles");

describe("Dark Cloud Cover", () => {
  test("valid JSON sample", () => {
    const content = readFileSync(
      "./assets/candles/darkCloudCover.json"
    ).toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("matching set of candles", () => {
    const candles = [
      {
        open: 20,
        high: 60,
        low: 15,
        close: 55
      },
      {
        open: 65,
        high: 70,
        low: 25,
        close: 37
      }
    ];
    expect(pattern(candles)).toBe(true);
  });
  test("no matching set of candles", () => {
    const candles = [
      {
        open: 20,
        high: 60,
        low: 15,
        close: 55
      },
      {
        open: 65,
        high: 70,
        low: 25,
        close: 38
      }
    ];
    expect(pattern(candles)).toBe(false);
  });
});
