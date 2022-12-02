const numbers = document.querySelectorAll("button.number");
const operators = document.querySelectorAll("button.operator");
const clear = document.querySelector('#clear');
const cancel = document.querySelector('#cancel');
const equal = document.querySelector('#equal')
const currentDisplay = document.querySelector(".current-display");
const lastDisplay = document.querySelector(".last-display");



numbers.forEach((number) => {
    number.addEventListener('click', (e)=> {
        currentDisplay.textContent += number.textContent
})
})

clear.addEventListener("click", (e)=> {
    lastDisplay.textContent = "";
    currentDisplay.textContent = "0";
})

operators.forEach((operator)=> {
    operator.addEventListener('click', (e)=> {
        lastDisplay.textContent = currentDisplay.textContent + " " + operator.id ;
        let firstValue = currentDisplay.textContent ; 
        
        
    })
})


// All calculus related functions
function add(a,b){return a + b}
function substract(a,b){return a - b}
function multiply(a,b){return a * b}
function divide(a,b){return a / b}

function operate(a, operator, b){
    if (operator === '+'){return add(a,b)}
    else if (operator === '-'){return substract(a,b)}
    else if (operator === '*'){return multiply(a,b)}
    else if (operator === '/'){return divide(a,b)}
}

// Other functions
