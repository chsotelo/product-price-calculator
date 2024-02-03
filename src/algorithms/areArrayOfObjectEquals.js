export const areObjectsEqual = (obj1, obj2) => {
  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    return obj1 === obj2;
  }

  const keys1 = Object?.keys(obj1);
  const keys2 = Object?.keys(obj2);

  if (
    keys1.length !== keys2.length ||
    !keys1.every((key) => keys2.includes(key))
  ) {
    return false;
  }

  return keys1.every((key) => areObjectsEqual(obj1[key], obj2[key]));
};

export const areArraysOfObjectsEqual = (arr1, arr2) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return false;
  }

  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((obj1, index) => areObjectsEqual(obj1, arr2[index]));
};
