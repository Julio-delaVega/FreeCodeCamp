function telephoneCheck(str) {
    let patt = /^1?\s?\(([0-9]{3})\)[- ]?([0-9]{3})[- ]?([0-9]{4})$|^1?\s?([0-9]{3})[- ]?([0-9]{3})[- ]?([0-9]{4})$/; 
    console.log(str);
    return patt.test(str);
}

console.log(telephoneCheck("555-555-5555"));
