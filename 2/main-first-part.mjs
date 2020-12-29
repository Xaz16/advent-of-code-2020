import { INPUT } from "./input.mjs";

/**
 * @param  {string} password
 * @param  {object} policy
 */
const isPasswordValid = (password, policy) => {
  const passwordChars = password.split("");
  const validForChars = [];
  const invalidForChars = [];

  for (const char in policy) {
    const { min, max } = policy[char];
    const findedChars = passwordChars.filter((item) => item === char);
    const isValidForChar =
      findedChars.length >= min && findedChars.length <= max;
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
  const [policy, password] = item.split(":");
  const [range, char] = policy.split(" ");
  const [min, max] = range.split("-");
  const passwordObj = {
    input: password,
    policy: { [char]: { min, max } },
  };

  return passwordObj;
});
const { validPasswords } = getValidPasswords(parsedPass);
console.log(`Answer is: ${validPasswords.length} valid passwords`);
