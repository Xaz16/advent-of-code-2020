import { INPUT } from "./input.mjs";

const seatIds = INPUT.split("\n")
  .map((item) => parseInt(item.replace(/(F|L)/gm, 0).replace(/(B|R)/gm, 1), 2))
  .sort((a, b) => b - a);

let answer;

for (let i = 0; i < seatIds.length; i++) {
  const currentNum = seatIds[i];
  const nextNum = seatIds[i + 1];

  if (nextNum && currentNum - nextNum !== 1) {
    answer = currentNum - 1;
  }
}

console.log(`Answer is: ${answer}`);
