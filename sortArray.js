function sortArrayByValueAndFrequency(arr) {
  const frequencyMap = {};

  arr.forEach((num) => {
    if (frequencyMap[num]) {
      frequencyMap[num]++;
    } else {
      frequencyMap[num] = 1;
    }
  });

  const numFreqArray = Object.keys(frequencyMap)?.map((key) => {
    return { num: parseInt(key), freq: frequencyMap[key] };
  });

  numFreqArray.sort((a, b) => {
    if (a.freq === b.freq) {
      return a.num - b.num;
    }
    return a.freq - b.freq;
  });

  const sortedArray = [];
  numFreqArray.forEach((item) => {
    for (let i = 0; i < item.freq; i++) {
      sortedArray.push(item.num);
    }
  });

  return sortedArray;
}

const input = [2, 3, 4, 4, 34, 6, 7, 2, 3, 7, 8, 8, 7, 9, 10, 41, 8];
const output = sortArrayByValueAndFrequency(input);

console.log("Expected Output: " + output);
