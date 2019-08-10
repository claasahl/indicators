const { readFileSync } = require("fs");

const { isShortDay: pattern } = require("../../build/candles");

describe("Short Day", () => {
  test("valid JSON sample", () => {
    const content = readFileSync("./assets/candles/shortDay.json").toString();
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
        open: 25,
        high: 80,
        low: 10,
        close: 10
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
