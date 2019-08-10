const { readFileSync } = require("fs");

const { isHangingMan: pattern } = require("../../build/candles/hangingMan");

describe("Hanging Man", () => {
  test("valid JSON sample", () => {
    const content = readFileSync("./assets/candles/hangingMan.json").toString();
    const { candles, trend } = JSON.parse(content);
    expect(pattern(candles, trend)).toBe(true);
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
