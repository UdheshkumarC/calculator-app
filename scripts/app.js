function Calculator() {
    this.currentInput = '';
    this.previousInput = '';
    this.operation = null;

    this.appendNumber = function(number) {
        this.currentInput += number;
        this.updateDisplay();
    };

    this.chooseOperation = function(operation) {
        if (this.currentInput === '') return;
        if (this.previousInput !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousInput = this.currentInput;
        this.currentInput = '';
    };

    this.compute = function() {
        let computation;
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentInput = computation.toString();
        this.operation = null;
        this.previousInput = '';
        this.updateDisplay();
    };

    this.updateDisplay = function() {
        const display = document.getElementById('display');
        display.value = this.currentInput || this.previousInput || '0';
    };

    this.clear = function() {
        this.currentInput = '';
        this.previousInput = '';
        this.operation = null;
        this.updateDisplay();
    };
}

const calculator = new Calculator();

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
    });
});

document.querySelectorAll('.operation').forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
    });
});

document.getElementById('equals').addEventListener('click', () => {
    calculator.compute();
});

document.getElementById('clear').addEventListener('click', () => {
    calculator.clear();
});