let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];


const currencyValues = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
};

document.getElementById("purchase-btn").addEventListener("click", () => {
    let cash = parseFloat(document.getElementById("cash").value);
    let changeDueElement = document.getElementById("change-due");

    if (isNaN(cash) || cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    let changeDue = cash - price;
    let totalCid = cid.reduce((total, bill) => total + bill[1], 0).toFixed(2);

    if (cash === price) {
        changeDueElement.textContent = "No change due - customer paid with exact cash";
        return;
    }

    if (parseFloat(totalCid) < changeDue) {
        changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    if (parseFloat(totalCid) === changeDue) {
        let sortedCid = [...cid].reverse();
        changeDueElement.textContent = "Status: CLOSED " + formatChange(sortedCid);
        return;
    }

    let change = calculateChange(changeDue, cid);

    if (!change) {
        changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
    } else {
        changeDueElement.textContent = "Status: OPEN " + formatChange(change);
    }
});

function calculateChange(amount, drawer) {
    let changeArray = [];
    let cidCopy = JSON.parse(JSON.stringify(drawer)).reverse(); 

    for (let [unit, totalAvailable] of cidCopy) {
        let unitValue = currencyValues[unit];
        let amountToGive = 0;

        while (amount >= unitValue && totalAvailable > 0) {
            amount -= unitValue;
            amount = Math.round(amount * 100) / 100; 
            totalAvailable -= unitValue;
            amountToGive += unitValue;
        }

        if (amountToGive > 0) {
            changeArray.push([unit, amountToGive]);
        }
    }

    return amount === 0 ? changeArray : null;
}

function formatChange(changeArray) {
    return changeArray
        .filter(([_, amount]) => amount > 0) 
        .map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`)
        .join(" ");
}
