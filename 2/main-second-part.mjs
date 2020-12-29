import { INPUT } from "./input.mjs";

const isPasswordValid = (password, policy) => {
  const validForChars = [];
  const invalidForChars = [];

  for (const char in policy) {
    const { firstIndex, secondIndex } = policy[char];
    const charOnFirstIndex = password.substr(firstIndex, 1);
    const charOnSecondIndex = password.substr(secondIndex, 1);

    const isCharPresentOnFirstIndex = char === charOnFirstIndex;
    const isCharPresentOnSecondIndex = char === charOnSecondIndex;

    const isValidForChar =
      isCharPresentOnSecondIndex !== isCharPresentOnFirstIndex;
    const arrToPush = isValidForChar ? validForChars : invalidForChars;
    arrToPush.push(char);
  }

  return {
    valid: !invalidForChars.length,
    invalidForChars,
    validForChars,
  };
};

const getValidPasswords = (passPairs) => {
  const validPasswords = [];
  const invalidPasswords = [];

  for (const pair of passPairs) {
    const { input, policy } = pair;
    const validationObj = isPasswordValid(input, policy);
    const arrToPush = validationObj.valid ? validPasswords : invalidPasswords;
    arrToPush.push(pair);
  }

  return {
    validPasswords,
    invalidPasswords,
  };
};

const parsedPass = INPUT.map((item) => {
  const [policy, password] = item.split(": ");
  const [range, char] = policy.split(" ");
  const [firstIndex, secondIndex] = range.split("-");
  const passwordObj = {
    input: password,
    policy: {
      [char]: { firstIndex: +firstIndex - 1, secondIndex: +secondIndex - 1 },
    },
  };

  return passwordObj;
});
const { validPasswords } = getValidPasswords(parsedPass);
console.log(`Answer is: ${validPasswords.length} valid passwords`);
