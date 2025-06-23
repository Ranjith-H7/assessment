//// for encrption and decryption for both for coding 1


function specialCipher(input, rotation) {
  let caseMap = '';
  let positions = '';
  let caesarOnly = ''; // Only letters go here
  let nonLetterMap = []; // To rebuild later

  // Step 1: Build Caesar-transformed string & case map
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];

    if (/[A-Za-z]/.test(ch)) {
      caseMap += ch === ch.toUpperCase() ? 'U' : 'L';
      positions += 'L';

      const upper = ch.toUpperCase();
      let code = upper.charCodeAt(0) - 65;
      let newCode = (code + rotation) % 26;
      caesarOnly += String.fromCharCode(65 + newCode);
    } else {
      // Non-letter (ignored in Caesar & RLE)
      positions += 'N';
      nonLetterMap.push({ index: i, char: ch });
    }
  }

  // Step 2: Apply RLE only on the caesarOnly string
  let rle = '';
  let i = 0;
  while (i < caesarOnly.length) {
    let count = 1;
    while (caesarOnly[i] === caesarOnly[i + 1]) {
      count++;
      i++;
    }
    rle += caesarOnly[i] + (count > 1 ? count : '');
    i++;
  }

  return {
    encrypted: rle,
    caseMap: caseMap,
    positions: positions,
    nonLetters: nonLetterMap,
  };
}

function decryptCipher(encrypted, rotation, caseMap, positions, nonLetters) {
  // Step 1: Expand RLE
  let expanded = '';
  for (let i = 0; i < encrypted.length; i++) {
    let char = encrypted[i];
    let num = '';

    while (!isNaN(encrypted[i + 1]) && encrypted[i + 1] !== ' ') {
      num += encrypted[i + 1];
      i++;
    }

    expanded += char.repeat(num ? parseInt(num) : 1);
  }

  // Step 2: Reverse Caesar + Rebuild full string
  let result = '';
  let letterIndex = 0;

  for (let i = 0; i < positions.length; i++) {
    if (positions[i] === 'L') {
      let ch = expanded[letterIndex++];
      let code = ch.charCodeAt(0) - 65;
      let newCode = (code - rotation + 26) % 26;
      let original = String.fromCharCode(65 + newCode);

      original = caseMap[i] === 'L' ? original.toLowerCase() : original;
      result += original;
    } else {
      // Find non-letter for this position
      const nonLetter = nonLetters.find(nl => nl.index === i);
      result += nonLetter ? nonLetter.char : '';
    }
  }

  return result;
}
 
const input = "rara@423";
console.log(`input ${input}`);
const rotation = 3;

const { encrypted, caseMap, positions, nonLetters } = specialCipher(input, rotation);
console.log("Encrypted:", encrypted);      // UDP
console.log("Case Map:", caseMap);         // ULL
console.log("Positions:", positions);      // LLLNNN
console.log("Non-Letters:", nonLetters);   // [{index:3,char:'#'}, {index:4,char:'2'}, {index:5,char:'3'}]

const decrypted = decryptCipher(encrypted, rotation, caseMap, positions, nonLetters);
console.log("Decrypted:", decrypted);      // ✅ Ram#23
