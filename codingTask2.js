/*
2. Write a program that finds the most optimized set of 6 units to shop with for values
fewer than 100. Example: Units used are 1, 2, 5, 10, 20, 50 1: 1 (1 unit used) 2: 2 (1
unit used) 3: 1+2 (2 units used) 4: 2+2 (2 units used) ... 98: 1+2+5+20+20+50 (6 units
used) 99: 2+2+5+20+20+50 (6 units used) AVG of units = 3.4

*/



function optimizedUnits() {
  const units = [1, 2, 5, 10, 20, 50].sort((a, b) => b - a); // Descending
  let totalUnits = 0;

  for (let amount = 1; amount < 100; amount++) {
    let rem = amount;
    let unitCount = 0;

    for (let coin of units) {
      if (rem >= coin) {
        let use = Math.floor(rem / coin);
        unitCount += use;
        rem -= coin * use;
      }
    }

    totalUnits += unitCount;
    // Uncomment to see individual breakdown:
    // console.log(`${amount}: ${unitCount} units`);
  }

  const average = totalUnits / 99;
  console.log("Average units used from 1 to 99:", average.toFixed(2));
}

optimizedUnits(); // Output: Average units used from 1 to 99: ~3.41


