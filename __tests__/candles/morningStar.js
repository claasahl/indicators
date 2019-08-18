const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").MorningStar;

describe("Morning Star", () => {
  test("valid JSON sample", () => {
    const content = readFileSync(
      "./assets/candles/morningStar.json"
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
        open: 60,
        high: 80,
        low: 10,
        close: 35
      },
      {
        open: 33,
        high: 34,
        low: 25,
        close: 27
      },
      {
        open: 40,
        high: 75,
        low: 25,
        close: 70
      }
    ];
    expect(pattern(candles, "down", 5)).toBe(true);
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
        open: 60,
        high: 80,
        low: 10,
        close: 35
      },
      {
        open: 33,
        high: 34,
        low: 25,
        close: 27
      },
      {
        open: 40,
        high: 75,
        low: 25,
        close: 70
      }
    ];
    expect(pattern(candles, "up", 5)).toBe(false);
  });
});
