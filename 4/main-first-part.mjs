import { INPUT } from "./input.mjs";
const REQUIRED_FIELDS = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
  // 'cid',
];

const validate = (fields) => {
  let isValid = false;
  for (const field of REQUIRED_FIELDS) {
    const value = !!fields[field];
    isValid = value;
    if (!isValid) {
      break;
    }
  }
  return isValid;
};

const validateItems = (items) => {
  const validItems = [];
  const invalidItems = [];

  for (const item of items) {
    const isValid = validate(item);
    const arrToPush = isValid ? validItems : invalidItems;
    arrToPush.push(item);
  }

  return {
    validItems,
    invalidItems,
  };
};

const items = INPUT.split("\n\n")
  .map((item) => item.replace(/\n/gm, " "))
  .map((item) => {
    const obj = {};
    const fields = item.split(" ");
    for (const field of fields) {
      const [key, value] = field.split(":");
      obj[key] = value;
    }
    return obj;
  });
const { validItems, invalidItems } = validateItems(items);
console.log(`Answer is: ${validItems.length}`);
