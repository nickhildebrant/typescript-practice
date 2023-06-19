"use strict";
var _a;
let message = 'Hello, World!';
console.log(message);
let num1 = 6;
num1 += 2;
console.log(num1);
let var1;
var1 = '1';
var1 += '1';
console.log(var1);
let numbers = [];
;
let mySize = 3 /* ShirtSize.Large */;
console.log(mySize);
function calculateTax(income, taxYear = 2022) {
    if (taxYear < 2022)
        return income * 1.2;
    return income * 1.3;
}
let employee = {
    id: 1,
    name: 'Nick',
    retire: (date) => {
        console.log(date);
    }
};
function KilogramToPounds(weight) {
    // Narrowing
    if (typeof weight === 'number')
        return weight * 2.2;
    if (typeof weight === 'string')
        return parseInt(weight) * 2.2;
}
KilogramToPounds(10);
KilogramToPounds('10kg');
let textBox = {
    drag: () => { },
    resize: () => { }
};
let quantity = 100;
function greet(name) {
    if (name)
        console.log(name.toUpperCase);
    else
        console.log('Who are you?');
}
greet(null);
function getCustomer(id) {
    return id === 0 ? null : { birthday: new Date() };
}
let customer = getCustomer(0);
// Optional property access operator
console.log((_a = customer === null || customer === void 0 ? void 0 : customer.birthday) === null || _a === void 0 ? void 0 : _a.getFullYear());
// Optional element access operator
let log = null;
log === null || log === void 0 ? void 0 : log('a');
//# sourceMappingURL=index.js.map