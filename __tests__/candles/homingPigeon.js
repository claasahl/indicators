const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").HomingPigeon;

describe("Homing Pigeon", () => {
  test("valid JSON sample", () => {
    const content = readFileSync(
      "./assets/candles/homingPigeon.json"
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
        open: 80,
        high: 85,
        low: 40,
        close: 45
      },
      {
        open: 65,
        high: 70,
        low: 30,
        close: 60
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
        open: 80,
        high: 85,
        low: 40,
        close: 45
      },
      {
        open: 65,
        high: 70,
        low: 30,
        close: 55
      }
    ];
    expect(pattern(candles, "down", 5)).toBe(false);
  });
});
