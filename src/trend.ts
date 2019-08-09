export type Trend = "up" | "down" | "bullish" | "bearish";

export function up(trend: Trend) {
  return trend === "up" || trend === "bullish";
}

export function down(trend: Trend) {
  return trend === "down" || trend === "bearish";
}
