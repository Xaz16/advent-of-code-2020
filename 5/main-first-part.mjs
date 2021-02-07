import { INPUT } from "./input.mjs";

const seatIds = INPUT.split("\n")
  .map((item) => parseInt(item.replace(/(F|L)/gm, 0).replace(/(B|R)/gm, 1), 2))
  .sort((a, b) => b - a);

console.log(`Highest seat id is: ${seatIds[0]}`);
