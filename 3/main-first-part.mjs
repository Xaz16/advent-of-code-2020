import { INPUT } from "./input.mjs";
const STRATEGY = { x: 3, y: 1 };

const doStep = (currentPosition, strategy) => {
  const { x, y } = strategy;
  return {
    x: currentPosition.x + x,
    y: currentPosition.y + y,
  };
};

const renderMap = (position, oldMap) => {
  const newMap = [...oldMap];
  while (position.x > newMap[position.y].length) {
    newMap[position.y] += newMap[position.y];
    const nextLineNumber = position.y + 1;
    if (newMap[nextLineNumber]) {
      newMap[
        nextLineNumber
      ] = `${newMap[nextLineNumber]}${newMap[nextLineNumber]}`;
    }
  }

  return newMap;
};

const countTrees = (strategy, pattern) => {
  const yLength = pattern.length;
  let renderedMap = pattern;
  const trees = [];

  let currentPosition = {
    x: 0,
    y: 0,
  };
  const positions = [currentPosition];

  while (yLength - currentPosition.y > 0) {
    renderedMap = renderMap(currentPosition, renderedMap);
    const currentEl = renderedMap[currentPosition.y];
    const currentLand = currentEl[currentPosition.x];
    if (!currentLand) {
      throw new Error("out of map!");
    }
    if (currentLand === "#") {
      trees.push(currentPosition);
    }
    const nextPosition = doStep(currentPosition, strategy);
    currentPosition = nextPosition;
    positions.push(currentPosition);
  }

  return { trees, renderedMap, positions };
};

const { trees, positions, renderedMap } = countTrees(STRATEGY, INPUT);
console.log(`Answer is: ${trees.length}`);
console.log(
  renderedMap
    .map((item, index) => {
      const position = positions[index];
      const newItem = item.split("");
      newItem[position.x] = `<span class="step">${item[position.x]}</span>`;
      return newItem.join("");
    })
    .join("\n")
);
