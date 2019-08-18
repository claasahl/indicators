const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").MatchingLow;

describe("Matching Low", () => {
  test("valid JSON sample", () => {
    const content = readFileSync(
      "./assets/candles/matchingLow.json"
    ).toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("matching set of candles", () => {
    const candles = [
      {
        open: 40,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 40,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 40,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 40,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 40,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 70,
        high: 85,
        low: 10,
        close: 10
      },
      {
        open: 65,
        high: 60,
        low: 10,
        close: 10
      }
    ];
    expect(pattern(candles, "down", 5)).toBe(true);
  });
  test("no matching set of candles", () => {
    const candles = [
      {
        open: 40,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 40,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 40,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 40,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 40,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 70,
        high: 85,
        low: 10,
        close: 10
      },
      {
        open: 45,
        high: 60,
        low: 10,
        close: 10
      }
    ];
    expect(pattern(candles, "down", 5)).toBe(false);
  });
});
