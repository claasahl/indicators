const { readFileSync } = require("fs");

const { isHangingMan: pattern } = require("../../build/candles");

describe("Hanging Man", () => {
  test("valid JSON sample", () => {
    const content = readFileSync("./assets/candles/hangingMan.json").toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("matching set of candles", () => {
    const candles = [
      {
        open: 50,
        high: 80,
        low: 5,
        close: 70
      }
    ];
    expect(pattern(candles)).toBe(true);
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
