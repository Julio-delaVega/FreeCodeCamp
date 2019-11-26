let numStr = "";
let index = 0;
const romans = [["M", 1000, "D", 500], ["C", 100, "L", 50], ["X", 10, "V", 5], ["I", 1, "", 0]];

function convertToRoman(num, index = 0) 
{
    if(index < 4)
    {
        var quotient = Math.trunc(num/romans[index][1]); // 3
        var remainder = num % romans[index][1]; // 499
        if(index == 0)
        {
            numStr = "";
            for(var i = 0; i < quotient; i++)
            {
                numStr += romans[index][0];
            }
        }
        else
        {
            if(quotient < 4)
            {
                for(var i = 0; i < quotient; i++)
                {
                    numStr += romans[index][0];
                }
            }
            if(quotient == 4)
            {
                numStr = numStr + romans[index][0] + romans[index - 1][2];
            }
            if(quotient > 4 && quotient < 9)
            {
                numStr += romans[index - 1][2];
                for(var i = 5; i < quotient; i++)
                {
                    numStr += romans[index][0];
                }
            }
            if(quotient == 9)
            {
                numStr = numStr + romans[index][0] + romans[index - 1][0];
            }
        }
        index++;
        convertToRoman(remainder, index);
    }
    return numStr;
}

let decimalNumber = 5;

console.log(convertToRoman(5));
console.log(convertToRoman(9));
console.log(convertToRoman(12));
