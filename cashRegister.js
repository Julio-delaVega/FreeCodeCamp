function checkCashRegister(price, cash, cid) {
    
    //  Object change (return value)
    var change = {};

    // cashIn is total cash in register
    var cashIn = 0.00; 
    cid.forEach(item => {
        cashIn += item[1];
    });
    //cashIn = parseFloat(cashIn.toFixed(2));

    // change due to client
    let changeDue = parseFloat((cash - price).toFixed(2)); // 5.21

    // In the off case that the price is exactly the same amount as the cash handed
    if(price == cash)
    {
        change.status = "OPEN";
        change.change = [];
        return change;
    }

    if(cashIn < changeDue)
    {
        // There's not enough money to give change
        change.status = "INSUFFICIENT_FUNDS";
        change.change = [];
        return change;
    }
    else
    {
        if(cashIn == changeDue)
        {
            // There is exactly the amount to give change
            change.status = "CLOSED";
            change.change = cid;
            return change;
        }
        // Array to contain change
        let changeArray = [];
        // Auxiliary array with currency values
        let currencyValue = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
        let changeGiven = 0;
        let index = 0;
        // Get currency larger than changeDue
        while(currencyValue[index] <= changeDue && index < currencyValue.length)
        {
            index++;
        }
        // Adjust index to get largest currency value smaller than changeDue
        index--; // 5
        let i = -1;
        while(changeGiven < changeDue && index >= 0)
        {
            // Current currency value according to variable index
            var currentCurrency = currencyValue[index];
            // If there is at least one amount of current currency:
            if(cid[index][1] >= currentCurrency)
            {
                // Push currency value to changeArray only if there is an amount available
                changeArray.push([cid[index][0], 0]);
                i++;
                // Up the currency amount to as much as needed or possible
                while(cid[index][1] > 0 && currentCurrency <= changeDue)
                {
                    changeArray[i][1] += currentCurrency;
                    cid[index][1] -= currentCurrency;
                    changeDue -= currentCurrency;
                }
            }
            // Adjusts for JavaScript's weird precision problem for that one last cent
            if(changeDue > 0 && changeDue < 0.01)
            {
                if(index == 0)
                {
                    // If there are already pennys listed, just add one penny to the amount
                    changeArray[i][1] += 0.01;
                }
                else
                {
                    // If there are no pennys listed, push the PENNY currency and one penny
                    changeArray.push(["PENNY", 0.01]);
                }
                // Ensures the next if to happen
                changeDue = 0;
            }
            if(changeDue == 0)
            {
                // Removes all currency with amount 0 (Couldn't figure out a better way)
                for(let j = 0; j < changeArray.length; j++)
                {
                    if(changeArray[j][1] == 0)
                    {
                        changeArray.splice(j, 1);
                        j--;
                    }
                }
                change.status = "OPEN";
                change.change = changeArray;
                return change;
            }
            index--;
        }
        change.status = "INSUFFICIENT_FUNDS";
        change.change = [];
        return change;
    }  
}
  
  // Example cash-in-drawer array:
  // [["PENNY", 1.01],
  // ["NICKEL", 2.05],
  // ["DIME", 3.1],
  // ["QUARTER", 4.25],
  // ["ONE", 90],
  // ["FIVE", 55],
  // ["TEN", 20],
  // ["TWENTY", 60],
  // ["ONE HUNDRED", 100]]
  
console.log(checkCashRegister(34.79, 40, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
console.log(checkCashRegister(3.26, 105, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));