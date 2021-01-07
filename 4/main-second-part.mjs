import { INPUT } from "./input.mjs";

const required = (value) => !!value.toString().length;
const length = (lengthOfValue) => (value) =>
  value.toString().length === lengthOfValue;
const range = (min, max) => (value) => {
  const convertedValue = +value;
  return convertedValue >= min && convertedValue <= max;
};

const getUnitsArg = (value, args) => {
  let returnArg;
  for (const arg of args) {
    if (value.includes(arg.name)) {
      returnArg = arg;
      break;
    }
  }
  return returnArg;
};

const units = (...args) => (value) => {
  const unitArg = getUnitsArg(value, args);
  let isValidUnit = false;
  if (unitArg) {
    for (const validation of unitArg.validation) {
      isValidUnit = validation(value.replace(unitArg.name, ""));
      if (!isValidUnit) {
        break;
      }
    }
  }

  return isValidUnit;
};

const pattern = (regexp) => (value) => value.search(regexp) >= 0;
const oneOf = (values) => (value) => values.includes(value);

const REQUIRED_FIELDS = {
  byr: {
    validation: [required, length(4), range(1920, 2002)],
  },
  iyr: {
    validation: [required, length(4), range(2010, 2020)],
  },
  eyr: {
    validation: [required, length(4), range(2020, 2030)],
  },
  hgt: {
    validation: [
      required,
      units(
        { name: "cm", validation: [range(150, 193)] },
        { name: "in", validation: [range(59, 76)] }
      ),
    ],
  },
  hcl: {
    validation: [required, pattern(/^\#[a-f0-9]{6}$/gm)],
  },
  ecl: {
    validation: [
      required,
      oneOf(["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]),
    ],
  },
  pid: {
    validation: [required, length(9)],
  },
  // 'cid',
};

const validate = (fields) => {
  let isValid = true;
  const requiredKeys = Object.keys(REQUIRED_FIELDS);

  for (const requiredKey of requiredKeys) {
    const isPresent = fields[requiredKey];
    if (!isPresent) {
      isValid = false;
      break;
    }
  }

  if (isValid) {
    for (const fieldName of requiredKeys) {
      const value = fields[fieldName];
      const fieldData = REQUIRED_FIELDS[fieldName];
      isValid = fieldData.validation.reduce((prev, current) => {
        return prev ? current(value) : prev;
      }, true);

      if (!isValid) {
        break;
      }
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
const { validItems } = validateItems(items);
console.log(`Answer is: ${validItems.length}`);
