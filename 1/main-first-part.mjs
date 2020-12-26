import { INPUT } from './input.mjs';

const findSum = (numbers, sumToFind) => {
    let answer;
    let counter = 0;

    for (const element of numbers) {
        const intToFind = sumToFind - element;
        const foundInt = numbers.find(item => item === intToFind);
        counter++;
        if (foundInt) {
            console.log(`counter after found ansewr: ${counter}`);
            answer = [foundInt, element];
            break;
        }
    }

    return answer;
}

const sortedNums = INPUT.sort((a, b) => a - b);
const pair = findSum(sortedNums, 2020);
const answer = pair.reduce((a, b) => a * b);
console.log(`Answer is: ${answer} for pair: [${pair[0]}, ${pair[1]}]`);



