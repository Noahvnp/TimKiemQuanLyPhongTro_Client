import { getNumbersFromAcreage, getNumbersFromPrice } from "./getNumbers";

export const getCodePrices = (totals) => {
  return totals.map((item) => {
    let arrMinMax = getNumbersFromPrice(item.value);
    let sortedArr = arrMinMax.sort((a, b) => a - b);
    return {
      ...item,
      min:
        sortedArr.length === 1 ? (sortedArr[0] === 15 ? 15 : 0) : sortedArr[0],
      max:
        sortedArr.length === 1
          ? sortedArr[0] === 15
            ? 999999
            : sortedArr[0]
          : sortedArr[1],
    };
  });
};

export const getCodeAcreages = (totals) => {
  return totals.map((item) => {
    let arrMinMax = getNumbersFromAcreage(item.value);
    let sortedArr = arrMinMax.sort((a, b) => a - b);
    return {
      ...item,
      min:
        sortedArr.length === 1 ? (sortedArr[0] === 90 ? 90 : 0) : sortedArr[0],
      max:
        sortedArr.length === 1
          ? sortedArr[0] === 90
            ? 999999
            : sortedArr[0]
          : sortedArr[1],
    };
  });
};

export const getGapsPrices = (arrMinMax, prices) => {
  const pricesMinMax = getCodePrices(prices);
  return pricesMinMax.filter(
    (price) =>
      (arrMinMax[0] === arrMinMax[1] &&
        price.min <= arrMinMax[0] &&
        price.max > arrMinMax[1]) ||
      (price.min >= arrMinMax[0] && price.min < arrMinMax[1]) ||
      (price.max > arrMinMax[0] && price.max <= arrMinMax[1])
  );
};

export const getGapsAcreages = (arrMinMax, acreages) => {
  const acreagesMinMax = getCodeAcreages(acreages);
  return acreagesMinMax.filter(
    (acreage) =>
      (arrMinMax[0] === arrMinMax[1] &&
        acreage.min <= arrMinMax[0] &&
        acreage.max > arrMinMax[1]) ||
      (acreage.min >= arrMinMax[0] && acreage.min < arrMinMax[1]) ||
      (acreage.max > arrMinMax[0] && acreage.max <= arrMinMax[1])
  );
};
