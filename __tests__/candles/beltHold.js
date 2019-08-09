const { readFileSync } = require("fs");

const { isBeltHold: pattern } = require("../../build/candles/beltHold");

describe("Belt Hold", () => {
  test("valid JSON sample", () => {
    const content = readFileSync("./assets/candles/beltHold.json").toString();
    const candles = JSON.parse(content);
    expect(pattern(candles[0], "up")).toBe(true);
  });
  test("matching set of candles", () => {
    const candle = {
      open: 80,
      high: 80,
      low: 40,
      close: 50
    };
    expect(pattern(candle, "up")).toBe(true);
  });
  test("no matching set of candles", () => {
    const candle = {
      open: 80,
      high: 80,
      low: 40,
      close: 50
    };
    expect(pattern(candle, "down")).toBe(false);
  });
});
