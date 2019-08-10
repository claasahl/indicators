const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").LongDay;

describe("Long Day", () => {
  test("valid JSON sample", () => {
    const content = readFileSync("./assets/candles/longDay.json").toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("matching set of candles", () => {
    const candles = [
      {
        open: 20,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 20,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 20,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 20,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 20,
        high: 60,
        low: 10,
        close: 50
      },
      {
        open: 10,
        high: 80,
        low: 10,
        close: 70
      }
    ];
    expect(pattern(candles, "up", 5)).toBe(true);
  });
  test("no matching set of candles", () => {
    const candles = [
      {
        open: 50,
        high: 80,
        low: 30,
        close: 70
      }
    ];
    expect(pattern(candles)).toBe(false);
  });
});
