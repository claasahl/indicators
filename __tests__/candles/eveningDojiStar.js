const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").EveningDojiStar;

describe("Evening Doji Star", () => {
  test("valid JSON sample", () => {
    const content = readFileSync(
      "./assets/candles/eveningDojiStar.json"
    ).toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("matching set of candles", () => {
    const candles = [
      {
        open: 20,
        high: 60,
        low: 10,
        close: 30
      },
      {
        open: 20,
        high: 60,
        low: 10,
        close: 30
      },
      {
        open: 20,
        high: 60,
        low: 10,
        close: 30
      },
      {
        open: 20,
        high: 60,
        low: 10,
        close: 30
      },
      {
        open: 20,
        high: 60,
        low: 10,
        close: 30
      },
      {
        open: 35,
        high: 80,
        low: 10,
        close: 60
      },
      {
        open: 83,
        high: 85,
        low: 75,
        close: 83
      },
      {
        open: 70,
        high: 75,
        low: 25,
        close: 30
      }
    ];
    expect(pattern(candles, "up", 5)).toBe(true);
  });
  test("no matching set of candles", () => {
    const candles = [
      {
        open: 20,
        high: 60,
        low: 10,
        close: 30
      },
      {
        open: 20,
        high: 60,
        low: 10,
        close: 30
      },
      {
        open: 20,
        high: 60,
        low: 10,
        close: 30
      },
      {
        open: 20,
        high: 60,
        low: 10,
        close: 30
      },
      {
        open: 20,
        high: 60,
        low: 10,
        close: 30
      },
      {
        open: 35,
        high: 80,
        low: 10,
        close: 60
      },
      {
        open: 83,
        high: 85,
        low: 75,
        close: 83
      },
      {
        open: 70,
        high: 75,
        low: 25,
        close: 30
      }
    ];
    expect(pattern(candles, "down", 5)).toBe(false);
  });
});
