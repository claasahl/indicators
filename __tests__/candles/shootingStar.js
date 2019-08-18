const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").ShootingStar;

describe("Shooting Star", () => {
  test("valid JSON sample", () => {
    const content = readFileSync(
      "./assets/candles/shootingStar.json"
    ).toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("matching set of candles", () => {
    const candles = [
      {
        open: 20,
        high: 70,
        low: 10,
        close: 60
      },
      {
        open: 75,
        high: 95,
        low: 70,
        close: 70
      }
    ];
    expect(pattern(candles)).toBe(true);
  });
  test("no matching set of candles", () => {
    const candles = [
      {
        open: 20,
        high: 70,
        low: 10,
        close: 60
      },
      {
        open: 60,
        high: 95,
        low: 70,
        close: 70
      }
    ];
    expect(pattern(candles)).toBe(false);
  });
});
