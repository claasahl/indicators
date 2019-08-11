const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").WhiteSoldier;

describe("White Soldier", () => {
  test("valid JSON sample", () => {
    const content = readFileSync(
      "./assets/candles/whiteSoldier.json"
    ).toString();
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
        open: 60,
        high: 65,
        low: 15,
        close: 20
      },
      {
        open: 25,
        high: 75,
        low: 10,
        close: 70
      }
    ];
    expect(pattern(candles, "down", 5)).toBe(true);
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
        open: 60,
        high: 65,
        low: 15,
        close: 20
      },
      {
        open: 25,
        high: 75,
        low: 10,
        close: 60
      }
    ];
    expect(pattern(candles, "down", 5)).toBe(false);
  });
});
