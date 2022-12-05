// Const creation
const numbers = document.querySelectorAll("button.number");
const operators = document.querySelectorAll("button.operator");
const clear = document.querySelector("#clear");
const cancel = document.querySelector("#cancel");
const equal = document.querySelector("#equal");
const point = document.querySelector(".point");
const currentDisplay = document.querySelector(".current-display");
const lastDisplay = document.querySelector(".last-display");

// Values initialization
let firstValue;
let secondValue;
let operatorSign = null;
let shouldReset = false;

// Event Listeners grouped
window.addEventListener("keydown", handleKeyboard);
cancel.addEventListener("click", cancelNumber);
clear.addEventListener("click", clearScreen);
point.addEventListener("click", appendPoint);

numbers.forEach((number) => {
  number.addEventListener("click", () => appendNumber(number.textContent));
});
operators.forEach((operator) => {
  operator.addEventListener("click", () => compute(operator.id));
});

// Functions definitions
function handleKeyboard(e) {
  if ((e.key >= 0 && e.key <= 9) || e.key === ".") appendNumber(e.key);
  if (e.key === "Backspace") cancelNumber();
  if (e.key === "Escape") clearScreen();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    compute(convertOperator(e.key));
  if (e.key === "=" || e.key === "Enter") makeOperation();
}

function appendNumber(a) {
  if (currentDisplay.textContent === "0" || shouldReset) {
    resetScreen();
  }
  currentDisplay.textContent += a;
}

function appendPoint() {
  if (shouldReset) resetScreen();
  if (currentDisplay.textContent === "") {
    currentDisplay.textContent = "0";
  }
  if (currentDisplay.textContent.includes(".")) return;
  currentDisplay.textContent += ".";
}

function resetScreen() {
  currentDisplay.textContent = "";
  shouldReset = false;
}

function clearScreen() {
  lastDisplay.textContent = "";
  currentDisplay.textContent = "0";
  firstValue = "";
  secondValue = "";
  operatorSign = null;
}

function cancelNumber() {
  currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
}

function compute(operator) {
  if (operatorSign !== null) makeOperation();

  firstValue = currentDisplay.textContent;
  operatorSign = operator;
  lastDisplay.textContent = `${firstValue} ${operatorSign}`;
  shouldReset = true;
}

function makeOperation() {
  if (operatorSign === null || shouldReset) return;
  if (operatorSign === "÷" && currentDisplay.textContent === "0") {
    alert("Are you trying to blow up the universe ?");
    return;
  }

  secondValue = currentDisplay.textContent;
  currentDisplay.textContent = roundResult(
    operate(firstValue, operatorSign, secondValue)
  );
  lastDisplay.textContent = `${firstValue} ${operatorSign} ${secondValue} =`;
  operatorSign = null;
  shouldReset = true; // This is optional, depends on what I want the calc to behave like
}

function roundResult(a) {
  return Math.round(a * 10000) / 10000;
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "*";
  if (keyboardOperator === "-") return "-";
  if (keyboardOperator === "+") return "+";
}

// All calculus related functions
function add(a, b) {
  return a + b;
}
function substract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function operate(a, operator, b) {
  a = Number(a);
  b = Number(b);
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return substract(a, b);
  } else if (operator === "*") {
    return multiply(a, b);
  } else if (operator === "÷") {
    return divide(a, b);
  }
}
