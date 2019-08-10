const { readFileSync } = require("fs");

const { test: pattern } = require("../../build/candles").MeetingLines;

describe("Short Day", () => {
  test("valid JSON sample (bearish trend)", () => {
    const content = readFileSync(
      "./assets/candles/meetingLines_down.json"
    ).toString();
    const { candles, trend, offset } = JSON.parse(content);
    expect(pattern(candles, trend, offset)).toBe(true);
  });
  test("valid JSON sample (bullish trend)", () => {
    const content = readFileSync(
      "./assets/candles/meetingLines_up.json"
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
        open: 90,
        high: 95,
        low: 45,
        close: 50
      },
      {
        open: 15,
        high: 80,
        low: 10,
        close: 50
      }
    ];
    expect(pattern(candles, "down", 5)).toBe(true);
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
