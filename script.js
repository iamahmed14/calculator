const mainDisplay = document.querySelector('.mainDisplay');
const subDisplay = document.querySelector('.subDisplay');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => button.onclick = () => action(button));

function operate() {
    let ans;

    if (calc.operator == "+") ans = calc.num1 + calc.num2;
    else if (calc.operator == "-") ans = calc.num1 - calc.num2;
    else if (calc.operator == "*") ans = calc.num1 * calc.num2;
    else if (calc.operator == "/") ans = calc.num1 / calc.num2;

    return +(Math.round(ans + "e+2")  + "e-2");
}

const calc = {
    num1: null,
    operator: null,
    num2: null,
    ans: null
}

function equals() {
    calc.num2 = parseFloat(calc.num2);
    subDisplay.innerHTML += " " + calc.num2 + " =";
    calc.ans = operate();
    mainDisplay.innerHTML = calc.ans;
    calc.num1 = null;
    calc.operator = null;
    calc.num2 = null;
}

function action(button) {
    if (button.classList.contains('num')) {
        if (!calc.operator) {
            subDisplay.innerHTML = "";
            if (!calc.num1)
                mainDisplay.innerHTML = button.innerHTML;
            else
                mainDisplay.innerHTML += button.innerHTML;

            calc.num1 = mainDisplay.innerHTML;
            calc.ans = null;
        }
        else {
            if (!calc.num2)
                mainDisplay.innerHTML = button.innerHTML;
            else
                mainDisplay.innerHTML += button.innerHTML;

            calc.num2 = mainDisplay.innerHTML;
        }
    }
    
    if (button.classList.contains('operator')) {
        if (calc.num2) equals();
        if (calc.ans) calc.num1 = calc.ans;
        calc.operator = button.innerHTML;
        calc.num1 = parseFloat(calc.num1);
        mainDisplay.innerHTML = calc.num1;
        subDisplay.innerHTML = calc.num1 + " " + calc.operator;
    }
    if (button.id=="equals") {
        if (calc.num1 && calc.operator, calc.num2) equals();
    }
    if (button.id=="clear") {
        subDisplay.innerHTML = "";
        mainDisplay.innerHTML = 0;
        calc.ans = null;
        calc.num1 = null;
        calc.num2 = null;
        calc.operator = null;
    }
    if (button.id=="backspace") {
        if (calc.operator && !calc.num2) return;
        if (calc.ans) return;

        if (mainDisplay.innerHTML.length > 1) {
            let sliced = mainDisplay.innerHTML.slice(0,-1);
            mainDisplay.innerHTML = sliced;

            if (calc.num2) calc.num2 = mainDisplay.innerHTML;
            else calc.num1 = mainDisplay.innerHTML;
        }
        else{
            mainDisplay.innerHTML = 0;

            if (calc.num2) calc.num2 = null;
            else calc.num1 = null;
        }
    }
}