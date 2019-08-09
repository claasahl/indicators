const { readFileSync } = require("fs");

const { isHammer: pattern } = require("../../build/candles/hammer");

describe("Hammer", () => {
  test("valid JSON sample", () => {
    const content = readFileSync("./assets/candles/hammer.json").toString();
    const { candles, trend } = JSON.parse(content);
    expect(pattern(candles[0], trend)).toBe(true);
  });
  test("matching set of candles", () => {
    const candle = {
      open: 70,
      high: 80,
      low: 5,
      close: 50
    };
    expect(pattern(candle)).toBe(true);
  });
  test("no matching set of candles", () => {
    const candle = {
      open: 70,
      high: 80,
      low: 30,
      close: 50
    };
    expect(pattern(candle)).toBe(false);
  });
});
