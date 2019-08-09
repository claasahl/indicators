const {
  simpleMovingAverage
} = require("../../build/indicators/simpleMovingAverage");

describe("simple moving average", () => {
  test("period: 0", () => {
    const sma = simpleMovingAverage(0);
    expect(sma(42)).toBeUndefined();
    expect(sma(23)).toBeUndefined();
  }),
    test("period: 1", () => {
      const sma = simpleMovingAverage(1);
      expect(sma(42)).toBe(42);
      expect(sma(23)).toBe(23);
    }),
    test("period: 2", () => {
      const sma = simpleMovingAverage(2);
      expect(sma(0)).toBeUndefined();
      expect(sma(1)).toBe(0.5);
      expect(sma(2)).toBe(1.5);
    }),
    test("period: 3", () => {
      const sma = simpleMovingAverage(3);
      expect(sma(0)).toBeUndefined();
      expect(sma(1)).toBeUndefined();
      expect(sma(2)).toBe(1);
      expect(sma(3)).toBe(2);
    });
});
