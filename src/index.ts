import { writeFileSync, readdirSync, readFileSync } from "fs";
import { Candle } from "./candle";

export * from "./candle";
export * from "./trend";
export * from "./candles";
export * from "./indicators";

function drawCandles(candles: Candle[]): Buffer {
  const draw = require("draw-candlestick");
  var input = {
    open: candles.map(c => c.open),
    high: candles.map(c => c.high),
    low: candles.map(c => c.low),
    close: candles.map(c => c.close)
  };
  return draw(input);
}

function generateSamples() {
  const path = "./assets/candles/";
  const files = readdirSync(path).filter(file => file.endsWith(".json"));
  files.forEach(file => {
    const content = readFileSync(path + file).toString();
    const candles = JSON.parse(content);

    const sample = drawCandles(candles);
    const sampleFile = path + file.replace(".json", ".png");
    writeFileSync(sampleFile, sample);
  });
}
generateSamples();
