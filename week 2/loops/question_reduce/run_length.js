function runLengthEncode(str) {
  return str.split('').reduce((acc, char) => {
    if (acc.length && acc[acc.length - 1][0] === char) {
      acc[acc.length - 1][1]++;
    } else {
      acc.push([char, 1]);
    }
    return acc;
  }, []);
}

console.log(runLengthEncode("aaabbc")); // → [["a",3], ["b",2], ["c",1]]
