function charFrequency(str) {
  return str.split('').reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});
}

console.log(charFrequency("aabcccd")); // → { a:2, b:1, c:3, d:1 }
