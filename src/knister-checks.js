export const checkForPairs = arr => {
  let count = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i; j < arr.length - 1; j++) {
      if (arr[i] === arr[j + 1]) {
        count++;
      }
    }
  }
  return count;
};
