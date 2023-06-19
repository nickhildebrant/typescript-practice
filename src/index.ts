let message : string = 'Hello, World!';
console.log(message);

let num1 : number = 6;
num1 += 2;
console.log(num1);

let var1 : any;
var1 = '1'
var1 += '1';
console.log(var1);

let numbers : number[] = [];

const enum ShirtSize { Small = 1, Medium = 2, Large = 3 };
let mySize : ShirtSize = ShirtSize.Large;
console.log(mySize);

function calculateTax(income : number, taxYear = 2022) : number {
    if(taxYear < 2022) return income * 1.2;

    return income * 1.3;
}

type Employee = {
    readonly id : number,
    name : string
    
    retire: (date : Date) => void
}

let employee : Employee = {
    id : 1,
    name : 'Nick',

    retire: (date: Date) => {
        console.log(date);
    }
};

function KilogramToPounds(weight: number | string) {
    // Narrowing
    if(typeof weight === 'number') return weight * 2.2;
    if(typeof weight === 'string') return parseInt(weight) * 2.2;
}

KilogramToPounds(10);
KilogramToPounds('10kg');

type Draggable = {
    drag: () => void;
}

type Resizable = {
    resize: () => void;
}

type UIWidget = Draggable & Resizable;

let textBox: UIWidget = {
    drag: () => {},
    resize: () => {}
}

type Quantity = 50 | 100;
let quantity: Quantity = 100;

type Metric = 'cm' | 'inch';

function greet(name: string | null | undefined) {
    if(name) console.log(name.toUpperCase);
    else console.log('Who are you?');
}

greet(null);

type Customer = {
    birthday?: Date
};

function getCustomer(id: number): Customer | null {
    return id === 0 ? null : { birthday : new Date() };
}

let customer = getCustomer(0);

// Optional property access operator
console.log(customer?.birthday?.getFullYear());

// Optional element access operator
let log: any = null;
log?.('a');