// Declare variables.
const character = "!";
const count = 10;
const rows = [];
let inverted = false;

// Function to pad the row with spaces.
function padRow(rowNumber, rowCount) {
    return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber);
}

// Loop through the rows and add them to the array.
for (let i = 1; i <= count; i++) {
    if (inverted) {
      rows.unshift(padRow(i, count));
    } else {
      rows.push(padRow(i, count));
    }
}

let result = ""

// Loop through the rows and print them.
for (const row of rows) {
  result = result + "\n" + row;
}

console.log(result);