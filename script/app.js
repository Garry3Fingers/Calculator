// Const for buttons

const outputPara = document.querySelector('p');

const digitsBtn = document.querySelectorAll('.digits-btn');

const clearBtn = document.querySelector('.clear-btn');

const undoBtn = document.querySelector('.undo-btn');

const divideBtn = document.querySelector('.divide-btn');

const multiplicationBtn = document.querySelector('.multiplication-btn');

const minusBtn = document.querySelector('.minus-btn');

const plusBtn = document.querySelector('.plus-btn');

const evenBtn = document.querySelector('.even-btn');

const periodBtn = document.querySelector('.period-btn');

const allBtn = document.querySelectorAll('button');

const mathBtn = document.querySelectorAll('.operation-btn');

// Input output block 

const output = {

  inputArr: [],

  findOperator() {

    const operator = this.inputArr.find((item) => item === ' + ' ||
      item === ' - ' || item === ' ÷ ' || item === ' x ');

    return operator;
    
  },
  
  checkOperator() {

    const operator = this.inputArr.some((operator) => operator === ' + ' ||
      operator === ' - ' || operator === ' ÷ ' || operator === ' x ');

    return operator;
    
   },

  showOutput() {

    outputPara.textContent = `${this.inputArr.join('')}`;

  },

  addPeriod() {

    if (mathOperations.evenState) {

      this.inputArr.length = 0;
      
      mathOperations.evenState = false;

      this.inputArr.push(0, '.');

    } else if (this.inputArr.toString() === '' ||
      this.inputArr[0] === 0) {
      
      this.inputArr.push(0, '.');

    } else {

      this.inputArr.push('.');
    
    };

    this.showOutput();

  },
  
  checkPeriod() { 

    const isPeriod = this.inputArr.some((item) => item === '.');

    if (isPeriod) {

      periodBtn.setAttribute('disabled', '');

    } else {

      periodBtn.removeAttribute('disabled', '');
      
    };

  },

  clearAll() { 

    periodBtn.removeAttribute('disabled', '');

    this.inputArr.length = 0;

    mathOperations.numbers.length = 0;

    outputPara.textContent = '0';

  },

  undoLastCharacter() { 

    if (mathOperations.evenState) return;

    const isOperator = this.checkOperator();

    let firstNumber;

    if (isOperator) {

      firstNumber = mathOperations.numbers.at(0);

      console.log(`numberFirst: ${firstNumber}`);

    };

    if (isOperator) {

      this.inputArr.pop();

      if (mathOperations.numbers.length >= 1) { 

        mathOperations.numbers.length = 0;

        mathOperations.numbers.push(firstNumber);

      };

    } else {

      const currentInput = [...this.inputArr.join('').split('')];

      this.inputArr = [...currentInput];

      this.inputArr.pop();

      console.log(`result: ${currentInput}`);
            
      console.log(`slice: ${this.inputArr}`);

      mathOperations.numbers.pop();

      console.log(`undo: ${this.inputArr} number: ${mathOperations.numbers}`);
    
    };

    if (this.inputArr.toString() === '') {

      outputPara.textContent = '0';

    } else {

      this.showOutput();

    };

  },

  getDigits(e) {

    let lengthOutput = outputPara.textContent.length;

    if (lengthOutput < 15) this.inputArr.push(Number
      (e.target.textContent));

   },

};

digitsBtn.forEach((btn) => { 

  btn.addEventListener('click', (e) => { 

    output.getDigits(e);

    if (mathOperations.evenState) { 

      mathOperations.evenState = false;

      output.inputArr.length = 0;

      mathOperations.numbers.length = 0;

      output.inputArr.push(Number(e.target.textContent));

      output.showOutput()

    };

  });

});

digitsBtn.forEach((btn) => { 

  btn.addEventListener('click', () => {
    
    output.showOutput();
  
  });

});

periodBtn.addEventListener('click', () => { 

  output.addPeriod();

});

allBtn.forEach((btn) => { 

  btn.addEventListener('click', () => { 

    output.checkPeriod();

  });

});

clearBtn.addEventListener('click', () => { 

  output.clearAll();

});

undoBtn.addEventListener('click', () => { 

  output.undoLastCharacter();

});

mathBtn.forEach((btn) => { 
  
  btn.addEventListener('click', () => { 

    if (mathOperations.evenState) { 

      mathOperations.evenState = false;

    };

  });

});

// Math operations

const mathOperations = {

  numbers: [],

  result: 0,

  evenState: false,

  addition() { 

    this.result = this.numbers.reduce((total, number) => {
      return roundToThree(total + number);
    }, 0);

    outputPara.textContent = `${this.result}`;

  },

  subtraction() {

    this.result = this.numbers.reduce((firstNumber, secondNumber) => { 
      return roundToThree(firstNumber - secondNumber);
    });

    outputPara.textContent = `${this.result}`;

  },
  
  division() { 

    this.result = this.numbers.reduce((firstNumber, secondNumber) => {
      return roundToThree(firstNumber / secondNumber);
    });

    outputPara.textContent = `${this.result}`;

  },

  multiplication() { 

    this.result = this.numbers.reduce((firstNumber, secondNumber) => {
      return roundToThree(firstNumber * secondNumber);
    });

    outputPara.textContent = `${this.result}`;

  },

};

// https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
// https://www.jacklmoore.com/notes/rounding-in-javascript/
function roundToThree(num) {

  return Number(Math.round(num + "e+3") + "e-3");

};

mathBtn.forEach((btn) => {

  btn.addEventListener('click', performFirstOperation);

});
 
function performFirstOperation(e) { 
  
  const checkOperator = output.checkOperator();

  console.log(!checkOperator);
  
  if (!checkOperator) {

    let operator = e.target.value;

    let operand = Number(output.inputArr.join(''));

    mathOperations.numbers.push(operand);

    console.log(`first: ${mathOperations.numbers}`)
    
    output.inputArr.length = 0;

    if (operator === '/') {

      output.inputArr.push(operand, ' ÷ ');

    } else if (operator === '*') {
    
      output.inputArr.push(operand, ' x ');

    } else {

      output.inputArr.push(operand, ` ${operator} `);

    };

  }; 

  output.showOutput();

};

mathBtn.forEach((btn) => { 

  btn.addEventListener('click', performSecondOperation);

});

function performSecondOperation(e) { 

  const operatorInArr = output.findOperator();
  
  let rightOperand = typeof output.inputArr[2] === 'number';

  let operator = e.target.value;

  console.log(operator);

  switch (true) { 

    case ((operatorInArr === ' + ') && rightOperand):
      mathOperations.numbers.push(Number(output.inputArr.slice(2).join('')));
      mathOperations.addition();
      break;
    
    case ((operatorInArr === ' - ') && rightOperand):
      mathOperations.numbers.push(Number(output.inputArr.slice(2).join('')));
      mathOperations.subtraction();
      break;
    
    case ((operatorInArr === ' ÷ ') && rightOperand):
      mathOperations.numbers.push(Number(output.inputArr.slice(2).join('')));
      mathOperations.division();
      break;
    
    case ((operatorInArr === ' x ') && rightOperand):
      mathOperations.numbers.push(Number(output.inputArr.slice(2).join('')));
      mathOperations.multiplication();
      break;

    default:
      return;
  };

  output.inputArr.length = 0;

  if (operator === '/') {

    output.inputArr.push(mathOperations.result, ' ÷ ');

  } else if (operator === '*') {
  
    output.inputArr.push(mathOperations.result, ' x ');
  
  } else {

    output.inputArr.push(mathOperations.result, ` ${operator} `);

  };

  mathOperations.numbers.length = 0;

  mathOperations.numbers.push(mathOperations.result);

  console.log(operator);

  output.showOutput();

};

evenBtn.addEventListener('click', calculateEvenOperation);

function calculateEvenOperation() { 

  const operator = output.findOperator();

  if (!operator || (output.inputArr[2] === undefined)) {

    if (output.inputArr[1]) {
      
      output.inputArr.pop();

      mathOperations.numbers.length = 0;

      output.showOutput();
    
    };

  } else {

    console.log(`even operator: ${operator}`);

    switch (true) {

      case (operator === ' + '):
        mathOperations.numbers.push(Number(output.inputArr.slice(2).join('')));
        console.log(` even math: ${mathOperations.numbers}`);
        mathOperations.addition();
        break;
    
      case (operator === ' - '):
        mathOperations.numbers.push(Number(output.inputArr.slice(2).join('')));
        console.log(` even math: ${mathOperations.numbers}`);
        mathOperations.subtraction();
        break;
    
      case (operator === ' ÷ '):
        mathOperations.numbers.push(Number(output.inputArr.slice(2).join('')));
        console.log(` even math: ${mathOperations.numbers}`);
        mathOperations.division();
        break;
    
      case (operator === ' x '):
        mathOperations.numbers.push(Number(output.inputArr.slice(2).join('')));
        console.log(` even math: ${mathOperations.numbers}`);
        mathOperations.multiplication();
        break;
    
    };

    output.inputArr.length = 0;

    output.inputArr.push(mathOperations.result);

    console.log(`even: ${output.inputArr}`);

    mathOperations.numbers.length = 0;

  };

  mathOperations.evenState = true;
    
};