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

const mathBtn = document.querySelectorAll('.second-operation');

// Input output block 

const output = {

  inputArr: [],

  showOutput() {

    outputPara.textContent = `${this.inputArr.join('')}`;

  },

  addPeriod() {

    this.inputArr.push('.');

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

    this.inputArr.length = 0;

    mathOperations.numbers.length = 0;

    outputPara.textContent = '0';

  },

  undoLastCharacter() { 

    this.inputArr.pop();

    if (this.inputArr.toString() === '') {

      outputPara.textContent = '0';

    } else { 

      outputPara.textContent = outputPara.textContent.slice(0,
        outputPara.textContent.length - 1);

    };

  },

  getDigits(e) {

    let lengthOutput = outputPara.textContent.length;

    if (lengthOutput < 15) output.inputArr.push(Number(e.target.textContent));

   },

};

digitsBtn.forEach((btn) => { 

  btn.addEventListener('click', (e) => { 

    output.getDigits(e);

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

// Math operations

const mathOperations = {

  numbers: [],

  result: 0,

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

  let checkOperator = !output.inputArr[1];

  console.log(checkOperator);
  
  if (checkOperator) {

    let operator = e.target.value;

    let operand = Number(output.inputArr.join(''));

    mathOperations.numbers.push(operand);
    
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

  const operatorInArr = output.inputArr.find((operator) => operator === ' + ' ||
    operator === ' - ' || operator === ' ÷ ' || operator === ' x ');
  
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

  const operator = output.inputArr.find((item) => item === ' + ' ||
    item === ' - ' || item === ' ÷ ' || item === ' x ');

  console.log(operator);

  switch (true) {

    case (operator === ' + '):
      mathOperations.numbers.push(Number(output.inputArr.slice(2).join('')));
      console.log(mathOperations.numbers);
      mathOperations.addition();
      break;
    
    case (operator === ' - '):
      mathOperations.numbers.push(Number(output.inputArr.slice(2).join('')));
      console.log(mathOperations.numbers);
      mathOperations.subtraction();
      break;
    
    case (operator === ' ÷ '):
      mathOperations.numbers.push(Number(output.inputArr.slice(2).join('')));
      console.log(mathOperations.numbers);
      mathOperations.division();
      break;
    
    case (operator === ' x '):
      mathOperations.numbers.push(Number(output.inputArr.slice(2).join('')));
      console.log(mathOperations.numbers);
      mathOperations.multiplication();
      break;
    
  };

  output.inputArr.length = 0;

  output.inputArr.push(mathOperations.result);

  console.log(output.inputArr);

  mathOperations.numbers.length = 0;

};