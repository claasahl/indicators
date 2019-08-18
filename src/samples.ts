import { writeFileSync, readdirSync, readFileSync } from "fs";
import { Canvas } from "canvas";
import * as d3Scale from "d3-scale";

import { Candle, bearish } from "./candle";
import { Trend, down, up } from "./trend";

function drawCandles(
  trend: Trend,
  candles: Candle[],
  width: number = 400,
  height: number = 400
): Buffer {
  const canvas = new Canvas(width, height);

  var ctx = canvas.getContext("2d");
  ctx.strokeRect(0, 0, width, height);
  ctx.translate(0, height);
  ctx.scale(1, -1);

  const min = candles.reduce(
    (acc, curr) => Math.min(acc, curr.low),
    Number.MAX_VALUE
  );
  const max = candles.reduce(
    (acc, curr) => Math.max(acc, curr.high),
    Number.MIN_VALUE
  );
  var y = d3Scale
    .scaleLinear()
    .domain([min, max])
    .range([50, height - 50]);

  ctx.strokeStyle = "#888";
  const step = 8;
  const offset = 40;
  if (down(trend)) {
    ctx.beginPath();
    [1, 2, 3].forEach(index => {
      const upper = height - step * index;
      const lower = height - step * index - offset;
      ctx.moveTo(step * index, upper);
      ctx.lineTo(step * index, lower);
    });
    ctx.stroke();
  } else if (up(trend)) {
    ctx.beginPath();
    [1, 2, 3].forEach(index => {
      const upper = step * index;
      const lower = step * index + offset;
      ctx.moveTo(step * index, upper);
      ctx.lineTo(step * index, lower);
    });
    ctx.stroke();
  }

  let barsCount = candles.length;
  let widthofBars = 20;
  let gapBetweenBars = 12;
  let leftOffset = 60;
  for (let i = 0; i < barsCount; i++) {
    const candle = candles[i];
    const open = candles[i].open;
    const high = candles[i].high;
    const low = candles[i].low;
    const close = candles[i].close;
    let height = Math.abs(y(open) - y(close));
    height = height > 0 ? height : 2;
    const xValue = leftOffset + (widthofBars + gapBetweenBars) * i;
    let colo;
    let start;
    if (bearish(candle)) {
      colo = "#e86c57";
      start = y(close);
    } else {
      colo = "#005700";
      start = y(open);
    }
    ctx.strokeStyle = colo;
    ctx.fillStyle = colo;
    ctx.beginPath();
    ctx.moveTo(xValue, y(high));
    ctx.lineTo(xValue, y(low));
    ctx.fillRect(xValue - widthofBars / 2, start, widthofBars, height);
    ctx.fill();
    ctx.stroke();
  }
  return canvas.toBuffer();
}

interface Sample {
  trend: Trend;
  candles: Candle[];
}
function generateSamples() {
  const path = "./assets/candles/";
  const files = readdirSync(path).filter(file => file.endsWith(".json"));
  files.forEach(file => {
    const content = readFileSync(path + file).toString();
    const { trend, candles } = JSON.parse(content) as Sample;

    const sample = drawCandles(trend, candles);
    const sampleFile = path + file.replace(".json", ".png");
    writeFileSync(sampleFile, sample);
  });
}
generateSamples();
