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

outputPara.textContent = '0';

digitsBtn.forEach((btn) => {
  
  btn.addEventListener('click', getDigitsInput);

});

const inputArr = [];

function getDigitsInput(e) {

  let lengthOutput = outputPara.textContent.length;

  let input = Number(e.target.textContent);
  

  if (lengthOutput < 15) inputArr.push(input);

 // console.log(inputArr);
};

clearBtn.addEventListener('click', () => {
  
  inputArr.length = 0

  mathOperations.numbers.length = 0;
  
  outputPara.textContent = '0';

//  console.log(inputArr);

});

digitsBtn.forEach((btn) => { 

  btn.addEventListener('click', showOutput);

});

function showOutput() { 

  let output = inputArr.join('');

  console.log(output);

  console.log(inputArr);

  outputPara.textContent = output;

};

undoBtn.addEventListener('click', () => { 

  inputArr.pop();

 // console.log(inputArr);

  let undoString = outputPara.textContent.slice(0, outputPara.textContent.length - 1);
  
 // console.log(undoString);

  if (undoString === '') {

    outputPara.textContent = '0';

  } else { 

    outputPara.textContent = undoString;

  };

});

periodBtn.addEventListener('click', () => { 

  inputArr.push('.');

  showOutput();

});

allBtn.forEach((btn) => {

  btn.addEventListener('click', checkPeriod);

});

function checkPeriod() { 

  const isPeriod = inputArr.some((item) => item === '.');

  if (isPeriod) {

    periodBtn.setAttribute('disabled', '');

  } else {

    periodBtn.removeAttribute('disabled', '');

  };

};

// Math operations

const mathOperations = {

  numbers: [],

  result: 0,

  addition() { 

    this.result = this.numbers.reduce((total, number) => {
      return roundToTwo(total + number);
    }, 0);

    outputPara.textContent = `${this.result}`;

  },

  subtraction() {

    this.result = this.numbers.reduce((firstNumber, secondNumber) => { 
      return roundToTwo(firstNumber - secondNumber);
    });

    outputPara.textContent = `${this.result}`;

   },

};

// https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
function roundToTwo(num) {
  return +(Math.round(num + "e+3") + "e-3");
};


mathBtn.forEach((btn) => {

  btn.addEventListener('click', performFirstOperation);

});
 
function performFirstOperation(e) { 

  const checkOperator = inputArr.some((item) => item[1] === '-' ||
    item[1] === '+');

  if (!checkOperator) {

    let operator = e.target.value;

    let operand = Number(inputArr.join(''));

    mathOperations.numbers.push(operand);
    
    inputArr.length = 0;

    inputArr.push(operand, ` ${operator} `);

  }; 

  showOutput();

};

mathBtn.forEach((btn) => { 

  btn.addEventListener('click', performSecondOperation);

});


function performSecondOperation(e) { 

  const operatorInArr = inputArr.find((operator) => operator === ' + ' ||
    operator === ' - ');
  
  let rightOperand = typeof inputArr[2] === 'number';

  let operator = e.target.value;

  console.log(operator);

  switch (true) { 

    case ((operatorInArr === ' + ') && rightOperand):
      mathOperations.numbers.push(Number(inputArr.slice(2).join('')));
      mathOperations.addition();
      break;
    
    case ((operatorInArr === ' - ') && rightOperand):
      mathOperations.numbers.push(Number(inputArr.slice(2).join('')));
      mathOperations.subtraction();
      break;
    
    default:
      return;
  };

  inputArr.length = 0;

  inputArr.push(mathOperations.result, ` ${operator} `);

  mathOperations.numbers.length = 0;

  mathOperations.numbers.push(mathOperations.result);

  console.log(operator);

  showOutput();

};



evenBtn.addEventListener('click', calculateEvenOperation);

function calculateEvenOperation() { 

  const operator = inputArr.find((item) => item === ' + ' ||
    item === ' - ');

  console.log(operator);

  switch (true) {

    case (operator === ' + '):
      mathOperations.numbers.push(Number(inputArr.slice(2).join('')));
      console.log(mathOperations.numbers);
      mathOperations.addition();
      break;
    
    case (operator === ' - '):
      mathOperations.numbers.push(Number(inputArr.slice(2).join('')));
      console.log(mathOperations.numbers);
      mathOperations.subtraction();
      break;
    
  };

  inputArr.length = 0;

  inputArr.push(mathOperations.result);

  console.log(inputArr);

  mathOperations.numbers.length = 0;

};