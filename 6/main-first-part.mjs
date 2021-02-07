import { INPUT } from "./input.mjs";

const groups = INPUT.split("\n\n").map((item) => item.replace(/\n/gm, ""));
const answerCounts = groups.map((item) => new Set(...item.split()).size);
const answer = answerCounts.reduce((prev, curr) => prev + curr);
console.log(answer);
