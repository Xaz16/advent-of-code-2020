import { INPUT, ROWS, COLS } from "./constants.mjs";

const rowsInstructionsCount = Math.log2(ROWS + 1);
const colsInstructionsCount = Math.log2(COLS + 1);

const seatIds = INPUT.split("\n")
  .map((item) => {
    if (item.length) {
      return {
        rows: item.slice(0, rowsInstructionsCount),
        cols: item.slice(
          rowsInstructionsCount,
          rowsInstructionsCount + colsInstructionsCount
        ),
      };
    }
  })
  .map((item) => {
    return {
      rows: parseInt(item.rows.replace(/(F|L)/gm, 0).replace(/(B|R)/gm, 1), 2),
      cols: parseInt(item.cols.replace(/(F|L)/gm, 0).replace(/(B|R)/gm, 1), 2),
    };
  })
  .map(({ rows, cols }) => rows * 8 + cols)
  .sort((a, b) => b - a);

console.log(`Highest seat id is: ${seatIds[0]}`);
