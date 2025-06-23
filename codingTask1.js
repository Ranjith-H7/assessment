/*

Coding Task Challenge
1. Write a special cipher that is a combination of Caesar’s cipher followed by a simple
RLE. The function should receive a string and the rotation number as parameters.
Input: special Cipher(“AABCCC”, 3) Output: D2EF3

*/


function specialCipher(input, rotation) {
  // Step 1: Apply Caesar Cipher (only on A-Z or a-z)
  let caesar = '';
  for (let char of input) {
    if (/[A-Za-z]/.test(char)) {
      let base = char === char.toUpperCase() ? 65 : 97;
      let newChar = String.fromCharCode(
        ((char.toUpperCase().charCodeAt(0) - 65 + rotation) % 26) + 65
      );
      caesar += newChar;
    }
  }

  // Step 2: Apply Run-Length Encoding (RLE)
  let result = '';
  let count = 1;

  for (let i = 0; i < caesar.length; i++) {
    if (caesar[i] === caesar[i + 1]) {
      count++;
    } else {
      result += caesar[i] + (count > 1 ? count : '');
      count = 1;
    }
  }

  return result;
}

// Example usage
let encrypted = specialCipher("AABCCC", 3);
console.log("Encrypted:", encrypted); // Output: D2EF3





