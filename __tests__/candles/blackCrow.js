const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").BlackCrow;

describe("Black Crow", () => {
  test("valid JSON sample", () => {
    const content = readFileSync("./assets/candles/blackCrow.json").toString();
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
        open: 25,
        high: 75,
        low: 22,
        close: 70
      },
      {
        open: 60,
        high: 65,
        low: 15,
        close: 20
      }
    ];
    expect(pattern(candles, "up", 5)).toBe(true);
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
        open: 25,
        high: 75,
        low: 22,
        close: 70
      },
      {
        open: 60,
        high: 65,
        low: 15,
        close: 25
      }
    ];
    expect(pattern(candles, "up", 5)).toBe(false);
  });
});
