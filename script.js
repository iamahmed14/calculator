const mainDisplay = document.querySelector('.mainDisplay');
const subDisplay = document.querySelector('.subDisplay');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => button.onclick = () => clicked(button));
document.addEventListener('keydown', e => pressed(e.key));

function operate() {
    let ans;

    if (calc.operator == "+") ans = calc.num1 + calc.num2;
    else if (calc.operator == "-") ans = calc.num1 - calc.num2;
    else if (calc.operator == "*") ans = calc.num1 * calc.num2;
    else if (calc.operator == "/") ans = calc.num1 / calc.num2;

    return +(Math.round(ans + "e+2")  + "e-2");
}

const calc = {
    num1: 0,
    operator: null,
    num2: 0,
    ans: null
}
function inputNumber(value) {
    if (!calc.operator) {
        subDisplay.innerHTML = "";
        if (calc.num1=="0")
            mainDisplay.innerHTML = value;
        else
            mainDisplay.innerHTML += value;
        
        calc.num1 = mainDisplay.innerHTML;
        calc.ans = null;
    }
    else {
        if (calc.num2=="0")
            mainDisplay.innerHTML = value;
        else
            mainDisplay.innerHTML += value;

        calc.num2 = mainDisplay.innerHTML;
    }
}

function inputOperator(value) {
    equals();
    if (calc.ans) calc.num1 = calc.ans;
    calc.operator = value;
    calc.num1 = parseFloat(calc.num1);
    mainDisplay.innerHTML = calc.num1;
    subDisplay.innerHTML = calc.num1 + " " + calc.operator;
}

function equals() {
    if (calc.num2) {
        calc.num2 = parseFloat(calc.num2);
        subDisplay.innerHTML += " " + calc.num2 + " =";
        calc.ans = operate();
        mainDisplay.innerHTML = calc.ans;
        calc.num1 = 0;
        calc.operator = null;
        calc.num2 = 0;
    }
}

function backSpace() {
    if (calc.operator && calc.num2=="0") return;
    if (calc.ans) return;

    if (mainDisplay.innerHTML.length > 1) {
        let sliced = mainDisplay.innerHTML.slice(0,-1);
        mainDisplay.innerHTML = sliced;

        if (calc.operator) calc.num2 = mainDisplay.innerHTML;
        else calc.num1 = mainDisplay.innerHTML;
    }
    else {
        mainDisplay.innerHTML = 0;

        if (calc.operator) calc.num2 = 0;
        else calc.num1 = 0;
    }
}

function clicked(button) {
    if (button.classList.contains('num'))
        inputNumber(button.innerHTML);
    
    if (button.classList.contains('operator'))
        inputOperator(button.innerHTML);
    
    if (button.id=="equals") {
        equals();
    }
    if (button.id=="clear") {
        subDisplay.innerHTML = "";
        mainDisplay.innerHTML = 0;
        calc.ans = null;
        calc.num1 = 0;
        calc.num2 = 0;
        calc.operator = null;
    }
    if (button.id=="backspace")
        backSpace();
}

function pressed(button) {
   
    for (let i=0; i<11; i++) {
        if (i==10) i = ".";
        if (button==i) inputNumber(button);
    }
    const arr = ['+', '-', '*', '/'];
    arr.forEach(i => {
        if (button==i) inputOperator(button);
    });
    if (button=='=' || button=='Enter') equals();
    if (button=='Backspace') backSpace();
}