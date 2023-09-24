export const getNumbersFromAcreage = (string) =>
  string
    .split(" ")
    .map((item) => +item.match(/\d+/))
    .filter((item) => item !== 0);

export const getNumbersFromPrice = (string) =>
  string
    .split(" ")
    .map((item) => +item)
    .filter((item) => !item === false);
