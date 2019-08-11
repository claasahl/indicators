const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").DescendingHawk;

describe("Descending Hawk", () => {
  test("valid JSON sample", () => {
    const content = readFileSync(
      "./assets/candles/descendingHawk.json"
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
        open: 45,
        high: 85,
        low: 40,
        close: 80
      },
      {
        open: 50,
        high: 80,
        low: 30,
        close: 80
      }
    ];
    expect(pattern(candles, "up", 5)).toBe(true);
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
        open: 45,
        high: 85,
        low: 40,
        close: 80
      },
      {
        open: 50,
        high: 80,
        low: 30,
        close: 65
      }
    ];
    expect(pattern(candles, "up", 5)).toBe(false);
  });
});
