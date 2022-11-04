// Const for buttons

const outputPara = document.querySelector('p');

const digitsBtn = document.querySelectorAll('.digits-btn');

const clearBtn = document.querySelector('.clear-btn');

const undoBtn = document.querySelector('.undo-btn');

const divideBtn = document.querySelector('.divide-btn');

const multiplicationBtn = document.querySelector('.multiplication-btn');

const minusBtn = document.querySelector('.minus-btn');

const plusBtn = document.querySelector('.plus-btn');

const equalBtn = document.querySelector('.even-btn');

const periodBtn = document.querySelector('.period-btn');

const allBtn = document.querySelectorAll('button');

const mathBtn = document.querySelectorAll('.operation-btn');

const leftParenthesis = document.querySelector('.left-parenthesis');

const rightParenthesis = document.querySelector('.right-parenthesis');

// Input output block 

const output = {

  inputArr: [],

  findOperator() {

    const operator = this.inputArr.find((item) =>
      item === ' + '
      || item === ' - '
      || item === ' ÷ '
      || item === ' x ');

    return operator;
    
  },
  
  checkOperator() {

    const operator = this.inputArr.some((operator) =>
      operator === ' + '
      || operator === ' - '
      || operator === ' ÷ '
      || operator === ' x ');

    return operator;
    
   },

  showOutput() {

    outputPara.textContent = `${this.inputArr.join('')}`;

  },

  addPeriod() {

    const hasPeriod = this.inputArr.some((item) => item === '.');

    const hasRightParenthesis = (this.inputArr.at(-1) === `\)`);

    if (hasPeriod || hasRightParenthesis) return;

    const operator = this.findOperator();

    const hasLeftParenthesis = (this.inputArr.at(-1) === `\(`);

    if (mathOperations.equalState) {

      this.inputArr.length = 0;
      
      mathOperations.equalState = false;

      this.inputArr.push(0, '.');

    } else if ((this.inputArr.toString() === '')
      || (this.inputArr.at(0) === 0)
      || (this.inputArr.at(-1) === operator)
      || hasLeftParenthesis) {
      
      this.inputArr.push(0, '.');

    } else {

      this.inputArr.push('.');
    
    };

    this.showOutput();

  },

  addMinus() { 

    const hasLeftParenthesis = (this.inputArr.at(-1) === `\(`);

    if (hasLeftParenthesis) {

      this.inputArr.push('-');

      this.showOutput();

    };

  },
  
  clearAll() { 

    mathOperations.firstOperationState = false;

    mathOperations.secondOperationState = false;

    mathOperations.addMinusState = false;

    mathOperations.equalState = false;

    this.inputArr.length = 0;

    mathOperations.numbers.length = 0;

    outputPara.textContent = '0';

  },

  undoLastCharacter() { 

    if (mathOperations.equalState) return;

    const isOperator = this.checkOperator();

    if (isOperator) {

      const checkMinus = this.inputArr.at(-1);

      if (checkMinus === '-') {
        
        mathOperations.secondOperationState = false;

      };

      this.inputArr.pop();

      if (!this.checkOperator()) {
        
        mathOperations.firstOperationState = false;

      };

    } else {

      mathOperations.firstOperationState = false;

      const currentInput = [...this.inputArr.join('').split('')];

      this.inputArr = [...currentInput];

      if ((this.inputArr.at(0) === '(')
        && (this.inputArr.at(1) === '-')) {

        mathOperations.addMinusState = false;

      };
        
      this.inputArr.pop();

      mathOperations.numbers.pop();

    };

    if (this.inputArr.toString() === '') {

      outputPara.textContent = '0';

    } else {

      this.showOutput();

    };

  },

  getDigits(e) {

    const digit = (e.type === 'click') ? e.target.textContent : e.key;

    if (mathOperations.equalState) {

      clearAfterEven();

      this.inputArr.push(Number(digit));

    } else {

      let lengthOutput = outputPara.textContent.length;

      if (lengthOutput < 31) {


        this.inputArr.push(Number(digit));

      };
    
    };

    this.showOutput();

  },

  getOperator(e) { 

    const operator = (e.type === 'click') ? e.target.value : e.key;

    return operator;

  },

  changeOperator(e) { 

    const hasOperator = this.checkOperator();

    if (hasOperator) {

      const noParenthesis = ((this.inputArr.at(-1) !== `\)`)
        && (this.inputArr.at(-1) !== `\(`));
      
      if (noParenthesis) {

        const typeOfLastItem = typeof this.inputArr.at(-1);

        if (typeOfLastItem !== 'number') {

          const operatorInArr = this.findOperator();

          let operator = this.getOperator(e);

          if (operator === '/') {

            operator = ' ÷ ';

          } else if (operator === '*') {

            operator = ' x ';

          } else {

            operator = ` ${operator} `;

          };

          if (operator !== operatorInArr) {

            this.inputArr[this.inputArr.length - 1] = operator;

            this.showOutput();

          };

        };

      };
      
    };

  },

  addLeftParenthesis() {

    if (mathOperations.equalState) {

      clearAfterEven();

      this.inputArr.push(`\(`);

    } else {

      const hasLeftParenthesis = this.inputArr.some(
        (item) => item === `\(`);
    
      if (hasLeftParenthesis) return;

      this.inputArr.push(`\(`);
    
    };

    this.showOutput();
  
  },

  addRightParenthesis() {

    if (mathOperations.equalState) {

      clearAfterEven();

      this.inputArr.push(`\)`);

    } else {

      const hasRightParenthesis = this.inputArr.some(
        (item) => item === `\)`);

      if (hasRightParenthesis) return;

      this.inputArr.push(`\)`);

    };

    this.showOutput();

   },

};

function clearAfterEven() { 

  mathOperations.equalState = false;

  output.inputArr.length = 0;

  mathOperations.numbers.length = 0;

};

leftParenthesis.addEventListener('click', () => {

  output.addLeftParenthesis();

});

rightParenthesis.addEventListener('click', () => { 

  output.addRightParenthesis();

});

mathBtn.forEach((btn) => { 

  btn.addEventListener('click', (e) => { 

    output.changeOperator(e);

  });

});

digitsBtn.forEach((btn) => { 

  btn.addEventListener('click', (e) => { 

    output.getDigits(e);

  });

});

periodBtn.addEventListener('click', () => { 

  output.addPeriod();

});

clearBtn.addEventListener('click', () => { 

  output.clearAll();

});

undoBtn.addEventListener('click', () => { 

  output.undoLastCharacter();

});

mathBtn.forEach((btn) => { 
  
  btn.addEventListener('click', () => { 

    mathOperations.handleEqualState();

  });

});

// Math operations

const mathOperations = {

  numbers: [],

  result: 0,

  addMinusState: false,

  equalState: false,

  firstOperationState: false,

  secondOperationState: false,

  handleEqualState() { 

    if (this.equalState) {

      this.equalState = false;

    };

  },

  getLeftOperand() {

    const operand = Number(output.inputArr.join('')
                                          .replace(/[()\s]/g, ''));

    return operand;

   },

  getRightOperand() {

    const operand = Number(output.inputArr.slice(2)
                                          .join('')
                                          .replace(/[()\s]/g, ''));

    return operand;

   },

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

  divisionOnZero() { 

    const operand = this.numbers.at(-1);

    if (operand === 0) { 

      output.inputArr.length = 0;

      this.numbers.length = 0;

      this.firstOperationState = false;

      this.secondOperationState = false;

      this.addMinusState = false;

      this.equalState = true;

      outputPara.textContent = 'Division on zero!';

      return true;

    };

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

// This event listener must be after event listener performFirstOperation
minusBtn.addEventListener('click', () => {

  output.addMinus();

});

function checkBeforeFirstOperation(operation) { 

  const operator = operation;

  const hasLeftParenthesis = output.inputArr.at(0) === `\(`;

  const checkMinus = output.inputArr.at(1) !== '-';

  if (hasLeftParenthesis && checkMinus && (operator === '-')
    && (!mathOperations.addMinusState)) {

    mathOperations.addMinusState = true;

    return true;

  };

  const findTypeNumber = output.inputArr.some((item) =>
    typeof item === 'number');

  const checkParenthesis = output.inputArr.some((item) =>
    item === '(' || item === ')');

  if (checkParenthesis && (!findTypeNumber)) {

    showError();

    return true;

  };

  const indexLeftParenthesis = output.inputArr.findIndex(
    (item) => item === '(');

  const indexRightParenthesis = output.inputArr.findIndex(
    (item) => item === ')');

  const indexFirstNumber = output.inputArr.findIndex(
    (item) => typeof item === 'number');

  const hasRightParenthesis = output.inputArr.some(
    (item) => item === ')');

  if (((indexRightParenthesis < indexFirstNumber) && hasRightParenthesis)
    || (indexLeftParenthesis > indexFirstNumber)) {

    showError();

    return true;

  };

  const indexLastNumber = output.inputArr.findLastIndex(
    (item) => typeof item === 'number');
  
  if (((indexLeftParenthesis < indexFirstNumber && indexLeftParenthesis > indexLastNumber)
    && hasLeftParenthesis) || ((indexRightParenthesis > indexFirstNumber
    && indexRightParenthesis < indexLastNumber) && hasRightParenthesis)) {

    showError();

    return true;

  };

};

function showError() { 

  output.inputArr.length = 0;

  mathOperations.numbers.length = 0;

  mathOperations.firstOperationState = false;

  mathOperations.secondOperationState = false;

  mathOperations.addMinusState = false;

  mathOperations.equalState = false;

  outputPara.textContent = 'Error';

};
 
function performFirstOperation(e) { 

  if (mathOperations.firstOperationState) return; 

  const operator = output.getOperator(e);

  const checkBeforeExecution = checkBeforeFirstOperation(operator);

  if (checkBeforeExecution) return;
    
  const checkOperator = output.checkOperator();
  
  if (!checkOperator) {
    
    mathOperations.numbers.length = 0;

    const leftOperand = mathOperations.getLeftOperand();

    mathOperations.numbers.push(leftOperand);
    
    output.inputArr.length = 0;

    if (operator === '/') {

      output.inputArr.push(leftOperand, ' ÷ ');

    } else if (operator === '*') {
    
      output.inputArr.push(leftOperand, ' x ');

    } else {

      output.inputArr.push(leftOperand, ` ${operator} `);

    };

  }; 

  mathOperations.firstOperationState = true;

  output.showOutput();

};

mathBtn.forEach((btn) => { 

  btn.addEventListener('click', performSecondOperation);

});

function performSecondOperation(e) { 
  
  const operator = output.getOperator(e);

  const checkMinus = checkMinusForSecondOperation(operator);

  if (checkMinus) return;

  const checkError = checkRightOperand();

  if (checkError) return;
  
  const operatorInArr = output.findOperator();
  
  const hasOperand = (typeof output.inputArr.at(2) === 'number')
    || (typeof output.inputArr.at(3) === 'number')
    || (typeof output.inputArr.at(4) === 'number');
  
  const rightOperand = mathOperations.getRightOperand();

  switch (true) { 

    case ((operatorInArr === ' + ') && hasOperand):
      mathOperations.numbers.push(rightOperand);
      mathOperations.addition();
      break;
    
    case ((operatorInArr === ' - ') && hasOperand):
      mathOperations.numbers.push(rightOperand);
      mathOperations.subtraction();
      break;
        
    case ((operatorInArr === ' ÷ ') && hasOperand):
      mathOperations.numbers.push(rightOperand);
      const hasZero = mathOperations.divisionOnZero();
      if (hasZero) return;
      mathOperations.division();
      break;
    
    case ((operatorInArr === ' x ') && hasOperand):
      mathOperations.numbers.push(rightOperand);
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

  mathOperations.secondOperationState = false;

  mathOperations.numbers.push(mathOperations.result);

  output.showOutput();

};

function checkMinusForSecondOperation(operation) { 

  const operator = operation;

  const charAfterOperator = [...output.inputArr.slice(2)];

  const leftParenthesis = charAfterOperator.at(0) === `\(`;

  const checkMinus = charAfterOperator.at(1) === '-';

  if ((operator === '-') && (!mathOperations.secondOperationState)
    && leftParenthesis && checkMinus) {

    mathOperations.secondOperationState = true;

    return true;

  };

};

function checkRightOperand() { 

  const checkOperator = output.checkOperator();

  const charAfterOperator = [...output.inputArr.slice(2)];

  const hasParenthesis = charAfterOperator.some((item) =>
    item === '(' || item === ')');

  const hasRightNumber = charAfterOperator.some((item) =>
    typeof item === 'number');

  if ((!hasRightNumber) && checkOperator && hasParenthesis) {

    showError();

    return true;

  };

  const indexLeftParenthesis = charAfterOperator.findIndex(
    (item) => item === '(');

  const indexRightParenthesis = charAfterOperator.findIndex(
    (item) => item === ')');

  const indexFirstNumber = charAfterOperator.findIndex(
    (item) => typeof item === 'number');

  const hasLeftParenthesis = charAfterOperator.some((item) =>
    item === '(');

  const hasRightParenthesis = charAfterOperator.some((item) =>
    item === ')');

  if (((indexLeftParenthesis > indexFirstNumber) && hasLeftParenthesis)
    || ((indexRightParenthesis < indexFirstNumber) && hasRightParenthesis)) {

    showError();

    return true;

  };

  const indexLastNumber = charAfterOperator.findLastIndex(
    (item) => typeof item === 'number');
  
  if (((indexLeftParenthesis < indexFirstNumber && indexLeftParenthesis > indexLastNumber)
    && hasLeftParenthesis) || ((indexRightParenthesis > indexFirstNumber
    && indexRightParenthesis < indexLastNumber) && hasRightParenthesis)) {

    showError();

    return true;

  };

};

equalBtn.addEventListener('click', calculateEqualOperation);

function calculateEqualOperation() { 

  const checkError = checkRightOperand();

  if (checkError) return;

  const checkOperator = output.checkOperator();

  const operator = output.findOperator();

  if (!checkOperator) {

    const checkBeforeExecution = checkBeforeFirstOperation(operator);

    if (checkBeforeExecution) return;

    const leftOperand = mathOperations.getLeftOperand();

    output.inputArr.length = 0;

    output.inputArr.push(leftOperand);

    mathOperations.addMinusState = false;
    
    mathOperations.equalState = true;

    output.showOutput();

    return;

  };

  if (output.inputArr.at(-1) === operator) {
    
    output.inputArr.pop();

    output.showOutput();

  } else {

    const rightOperand = mathOperations.getRightOperand();

    switch (true) {

      case (operator === ' + '):
        mathOperations.numbers.push(rightOperand);
        mathOperations.addition();
        break;
    
      case (operator === ' - '):
        mathOperations.numbers.push(rightOperand);
        mathOperations.subtraction();
        break;
    
      case (operator === ' ÷ '):
        mathOperations.numbers.push(rightOperand);
        const hasZero = mathOperations.divisionOnZero();
        if (hasZero) return;
        mathOperations.division();
        break;
    
      case (operator === ' x '):
        mathOperations.numbers.push(rightOperand);
        mathOperations.multiplication();
        break;
    
    };

    output.inputArr.length = 0;

    output.inputArr.push(mathOperations.result);

    mathOperations.numbers.length = 0;

  };

  mathOperations.firstOperationState = false;

  mathOperations.secondOperationState = false;

  mathOperations.addMinusState = false;

  mathOperations.equalState = true;
    
};

// Keyboard support

window.addEventListener('keydown', (e) => { 
  
  switch (true) { 

    case (e.key === '('):
      output.addLeftParenthesis();
      break;
    
    case (e.key === ')'):
      output.addRightParenthesis();
      break;

    case(e.key === '+' || e.key === '-'
      || e.key === '*' || e.key === '/'):
      output.changeOperator(e);
      performFirstOperation(e);
      // The method addMinus must be after performFirstOperation
      // and before performSecondOperation
      output.addMinus();
      performSecondOperation(e);
      mathOperations.handleEqualState();
      break;

    case(e.code >= 'Digit0' && e.code <= 'Digit9'):
      output.getDigits(e);
      break;
    
    case(e.key === '='):
      calculateEqualOperation();
      break;
    
    case(e.code === 'Period'):
      output.addPeriod();
      break;
    
    case(e.code === 'KeyD'):
      output.undoLastCharacter();
      break;
    
    case(e.code === 'KeyC'):
      output.clearAll();
      break;
    
    default:
      return;

  };

});