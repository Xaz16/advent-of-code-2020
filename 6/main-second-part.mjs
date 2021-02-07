import { INPUT } from "./input.mjs";
const NEW_LINE_REG_EXP = /\n/gm;
const groups = INPUT.split("\n\n");

class Counter {
  #count;

  constructor() {
    this.#count = new Map();
  }

  add(key) {
    const initialValue = this.#count.get(key) || 0;
    this.#count.set(key, initialValue + 1);
  }

  values() {
    return [...this.#count.values()];
  }
}

const answerCounts = groups.map((item) => {
  const newLinesCount = item.match(NEW_LINE_REG_EXP);
  const count = (newLinesCount && newLinesCount.length) || 0;
  const strToSearch = item.replace(NEW_LINE_REG_EXP, "");
  const counter = new Counter();

  for (const char of strToSearch) {
    counter.add(char);
  }

  const total = counter.values();
  const allPositive = total.filter((item) => item === count + 1);

  return allPositive.length;
});
const answer = answerCounts.reduce((prev, curr) => prev + curr);
console.log(answer);
