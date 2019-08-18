export function simpleMovingAverage(
  period: number
): (item: number) => number | undefined {
  if (period <= 0) {
    return () => undefined;
  }

  const context: {
    data: number[];
    sum: number;
  } = {
    data: [],
    sum: 0
  };
  return (item: number) => {
    context.sum += item;
    context.data.push(item);
    if (context.data.length === period + 1) {
      const oldestValue = context.data.shift() as number;
      context.sum -= oldestValue;
      return context.sum / period;
    } else if (context.data.length === period) {
      return context.sum / period;
    } else {
      return undefined;
    }
  };
}
