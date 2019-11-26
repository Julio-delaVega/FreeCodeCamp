function palindrome(str) {
  var flag = true;
  var modifiedStr = (str.replace(/[^0-9a-z]/gi, '')).toLowerCase();
  console.log(modifiedStr);
  const length = modifiedStr.length;
  for(var i = 0; i < length/2; i++)
  {
    if(modifiedStr[i] != modifiedStr[length - i - 1])
    {
      flag = false;
    }
  }
  return flag;
}

console.log(palindrome("Hello everyone!"));
console.log(palindrome("Not eye ton."));
console.log(palindrome("eye"));
console.log(palindrome("Anita lava la tina"));
