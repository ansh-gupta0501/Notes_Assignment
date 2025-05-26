function removeAnagrams(words) {
  const seen = new Set();  //keep track of unique "signatures"
  return words.filter(word => {
    const sorted = word.split('').sort().join('');  //  // Create a "signature" by sorting letters of the word
    if (seen.has(sorted)) return false;  // // If this signature was seen before, skip this word
    seen.add(sorted);  //  // Otherwise, add the signature and keep this word
    return true;
  });
}

console.log(removeAnagrams(["listen", "silent", "enlist", "google", "gogole"]));
// ["listen", "google"]


/* 
word.split('') → splits word into letters, e.g. "listen" → ["l", "i", "s", "t", "e", "n"]

.sort() → sorts letters alphabetically → ["e", "i", "l", "n", "s", "t"]

.join('') → joins sorted letters back into a string → "eilnst"

This signature will be the same for all anagrams because they contain the exact same letters.
*/