import { INPUT } from './input.mjs';
let counter = 0;

const findSum = (inputNumber, numbers, sumToFind) => {
    let answer;
    if (numbers.length === 0 || inputNumber === undefined) {
        return;
    }

    const currentNumberIndex = numbers.findIndex((item) => item === inputNumber);

    for (let i = 0; i < numbers.length; i++) {
        const el = numbers[i];
        let result = inputNumber + el;
        counter++;
        if (result < sumToFind) {
            const intToFind = sumToFind - result;
            const findedInt = numbers.find(item => item === intToFind);
            if (result + findedInt === sumToFind) {
                console.log(`counter after found ansewr: ${counter}`);
                answer = [inputNumber, el, findedInt];
                break;
            }
        }
    }

    if (!answer) {
        const nextNumber = numbers[currentNumberIndex + 1];
        const nextNumbers = numbers.filter((item) => item !== inputNumber);
        answer = findSum(nextNumber, nextNumbers, sumToFind)
    }

    return answer;
}

const filteredInput = INPUT.sort((a, b) => a - b);
const elements = findSum(filteredInput[0], filteredInput, 2020)
const answer = elements.reduce((a, b) => a * b);
console.log(`Answer is: ${answer} for elements: ${elements}`);