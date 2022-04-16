// DOM items
const operandBtn = document.querySelectorAll('.operand');
const operatorBtn = document.querySelectorAll('.operator');
const currentDisp = document.getElementById('current');
const lastDisp = document.getElementById('last');
const clearBtn = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete');
const equalsBtn = document.querySelector('.equals');
const signsBtn = document.querySelector('.signs');
const decimalBtn = document.querySelector('.decimal');

// Event listeners
equalsBtn.addEventListener('click', eval);
deleteBtn.addEventListener('click', delOne);
clearBtn.addEventListener('click', clearAll);
signsBtn.addEventListener('click', addSign);
decimalBtn.addEventListener('click', addDecimal);

// Default values
let currOp = null;
let firstVal;
let secondVal;
let screenReset = false;

// Character limit (20)
function numLimit(){
    const currDispVal = currentDisp.textContent;
    if(currDispVal.length > 20){
        currentDisp.textContent = currDispVal.substring(0, 20);
    }
}

// Iterate each number and operator
operandBtn.forEach(operand => {
    operand.addEventListener('click', () => appendNum(operand.textContent));
});

operatorBtn.forEach(operator => { 
    operator.addEventListener('click', () => setOp(operator.textContent));
});

// Append numbers on the display (current)
function appendNum(value){
    if(lastDisp.textContent === 'I can\'t do that for you'){
        clearAll();
    }

    if(currentDisp.textContent === '0' || screenReset){
        resetScreen();
    }
    currentDisp.textContent += value;
    numLimit();
}

// Set current operator
function setOp(value){
    if (currOp !== null) {
        eval()
    } 

    firstVal = currentDisp.textContent; // First Operand

    currOp = value;
    lastDisp.textContent = `${firstVal} ${currOp}`;
    screenReset = true;
}

// Reset screen
function resetScreen() {
    currentDisp.textContent = ''
    screenReset = false;
}

// Equals button logic 
function eval(){
    if (currOp === null || screenReset) return;

    if (currOp === '÷' && currentDisp.textContent === '0') {
        lastDisp.textContent = 'I can\'t do that for you';
        return;
    }

    secondVal = currentDisp.textContent; // Second Operand

    currentDisp.textContent = roundNum(operate(currOp, firstVal, secondVal))
    lastDisp.textContent = `${firstVal} ${currOp} ${secondVal} =`
    currOp = null
    screenReset = true;
}

// Round number (max 2 decimals)
function roundNum(num){
    return Math.round(num * 100) / 100;
}

// Operations

// Add
function add(num1, num2){
    return num1 + num2
}

// Substract
function subtract(num1, num2){
    return num1 - num2
}

// Multiply
function multiply(num1, num2){
    return num1 * num2
}

// Divide
function divide(num1, num2){
    return num1 / num2
}

// Select operator
function operate(op, val1, val2){
    val1 = +val1;
    val2 = +val2;
    switch(op){
        case '+':
            return add(val1, val2);
        case '-':
            return subtract(val1, val2);
        case 'x':
            return multiply(val1, val2);
        case '÷':
            if (val2 === 0) return clearAll();
            return divide(val1, val2);
        default:
            return null;
    }
}

// Clear button logic
function clearAll(){
    firstVal = '';
    secondVal = ''; 
    currentDisp.textContent = '0';
    lastDisp.textContent = '';
    currOp = null;
}

// Delete button logic
function delOne(){
    const currentDispVal = currentDisp.textContent.length;
    if(currentDispVal <= 1){
        currentDisp.textContent = '0';
    } else{
        currentDisp.textContent = currentDisp.textContent.slice(0, -1);
    }
}

// Signs button logic
function addSign(){
    if(!currentDisp.textContent.includes('-')){
        currentDisp.textContent = '-' + currentDisp.textContent;
    } else if(currentDisp.textContent.includes('-')){
        currentDisp.textContent = currentDisp.textContent.substring(1);
    }
}

// Add decimal
function addDecimal(){
    if(!currentDisp.textContent.includes(decimalBtn.textContent)){
        currentDisp.textContent = currentDisp.textContent + decimalBtn.textContent;
    } else {
        return;
    }
}