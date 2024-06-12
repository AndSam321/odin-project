document.addEventListener('DOMContentLoaded', function() {
    let clear = document.querySelector('.clear');
    let equal = document.querySelector('.equal');
    let decimal = document.querySelector('.decimal');
    let numbers = document.querySelectorAll('.number');
    let operators = document.querySelectorAll('.operator');
    let screen = document.querySelector('.calculator-screen');
    let previousScreen = document.querySelector('.previous-screen');

    let currentValue = '';
    let previousValue = '';
    let currentOperator = null;
    let expression = '';

    numbers.forEach(function(number) {
        number.addEventListener('click', function(e) {
            handleNumber(e.target.textContent);
        });
    });

    operators.forEach(function(operator) {
        operator.addEventListener('click', function(e) {
            handleOperator(e.target.textContent);
        });
    });

    equal.addEventListener('click', function() {
        handleEqual();
    });

    clear.addEventListener('click', function() {
        handleClear();
    });

    decimal.addEventListener('click', function() {
        handleDecimal();
    });

    function handleNumber(number) {
        if (currentOperator === null) {
            currentValue += number;
        } else {
            currentValue = number;
            currentOperator = null; // Reset operator flag for new input
        }
        updateScreen(currentValue);
    }

    function handleOperator(operator) {
        if (currentValue === '') return;
        if (expression !== '') {
            handleEqual();
        }
        currentOperator = operator;
        expression = currentValue + ' ' + currentOperator;
        previousValue = currentValue;
        currentValue = '';
        updateScreen(currentValue);
        updatePreviousScreen(expression);
    }
    

    function handleEqual() {
        if (currentValue === '' || previousValue === '' || currentOperator === null) return;
    
        let result;
        const prev = parseFloat(previousValue);
        const current = parseFloat(currentValue);
    
        switch (currentOperator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
    
        currentValue = result.toString();
        expression += ' ' + currentOperator + ' ' + current + ' = ' + currentValue;
        updateScreen(currentValue);
        updatePreviousScreen(expression);
        currentOperator = null;
    }

    function handleClear() {
        currentValue = '';
        previousValue = '';
        currentOperator = null;
        expression = '';
        updateScreen(currentValue);
        updatePreviousScreen(expression);
    }

    function handleDecimal() {
        if (!currentValue.includes('.')) {
            currentValue += '.';
            updateScreen(currentValue);
        }
    }

    function updateScreen(value) {
        screen.value = value;
    }

    function updatePreviousScreen(value) {
        previousScreen.textContent = value;
    }
});
