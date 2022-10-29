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

const leftParenthesis = document.querySelector('.left-parenthesis');

const rightParenthesis = document.querySelector('.right-parenthesis');

// Input output block 

const output = {

  inputArr: [],

  findOperator() {

    const operator = this.inputArr.find((item) =>
      item === ' + ' ||
      item === ' - ' ||
      item === ' ÷ ' ||
      item === ' x ');

    return operator;
    
  },
  
  checkOperator() {

    const operator = this.inputArr.some((operator) =>
      operator === ' + ' ||
      operator === ' - ' ||
      operator === ' ÷ ' ||
      operator === ' x ');

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

    if (mathOperations.evenState) {

      this.inputArr.length = 0;
      
      mathOperations.evenState = false;

      this.inputArr.push(0, '.');

    } else if ((this.inputArr.toString() === '') ||
      (this.inputArr.at(0) === 0) || 
      (this.inputArr.at(-1) === operator) ||
      hasLeftParenthesis) {
      
      this.inputArr.push(0, '.');

    } else {

      this.inputArr.push('.');
    
    };

    this.showOutput();

  },

  addMinus() { 

    const hasLeftParenthesis = (this.inputArr.at(-1) === `\(`);

    if ((this.inputArr.at(0) === undefined) ||
      hasLeftParenthesis) {

      this.inputArr.push('-');

      this.showOutput();

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

    if (isOperator) {

      this.inputArr.pop();

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
  
  changeOperator(e) { 

    const hasOperator = this.checkOperator();

    if (hasOperator) {

      let noParenthesis = ((this.inputArr.at(-1) !== `\)`) &&
        (this.inputArr.at(-1) !== `\(`));
      
      if (noParenthesis) {

        let typeOfLastItem = typeof this.inputArr.at(-1);

        if (typeOfLastItem !== 'number') {

          const operatorInArr = this.findOperator();

          let operator = e.target.value;

          if (operator === '/') {

            operator = ' ÷ ';

          } else if (operator === '*') {

            operator = ' x ';

          } else {

            operator = ` ${e.target.value} `;

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

    const hasLeftParenthesis = this.inputArr.some(
      (item) => item === `\(`);
    
    if (hasLeftParenthesis) return;

    this.inputArr.push(`\(`);

    this.showOutput();

  },

  addRightParenthesis() {

    const hasRightParenthesis = this.inputArr.some(
      (item) => item === `\)`);

    if (hasRightParenthesis) return;

    this.inputArr.push(`\)`);

    this.showOutput();

   },

};

minusBtn.addEventListener('click', () => { 

  output.addMinus();

});

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

  const findTypeNumber = output.inputArr.some((item) =>
    typeof item === 'number');

  const leftParenthesis = output.inputArr.at(0) === `\(`;

  if (((output.inputArr.at(0) === '-') && (!findTypeNumber)) ||
    (leftParenthesis && (!findTypeNumber))) return;
  
  const checkOperator = output.checkOperator();

  console.log(!checkOperator);
  
  if (!checkOperator) {
    
    mathOperations.numbers.length = 0;

    const operator = e.target.value;

    const leftOperand = mathOperations.getLeftOperand();

    mathOperations.numbers.push(leftOperand);

    console.log(`first: ${mathOperations.numbers}`)
    
    output.inputArr.length = 0;

    if (operator === '/') {

      output.inputArr.push(leftOperand, ' ÷ ');

    } else if (operator === '*') {
    
      output.inputArr.push(leftOperand, ' x ');

    } else {

      output.inputArr.push(leftOperand, ` ${operator} `);

    };

  }; 

  output.showOutput();

};

mathBtn.forEach((btn) => { 

  btn.addEventListener('click', performSecondOperation);

});

function performSecondOperation(e) { 

  const operatorInArr = output.findOperator();
  
  const hasOperand = (typeof output.inputArr.at(2) === 'number') ||
    (typeof output.inputArr.at(3) === 'number') ||
    (typeof output.inputArr.at(4) === 'number');
  
  const rightOperand = mathOperations.getRightOperand();

  console.log(`right: ${rightOperand}`);

  const operator = e.target.value;

  console.log(operator);

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

  mathOperations.numbers.push(mathOperations.result);

  console.log(operator);

  output.showOutput();

};

evenBtn.addEventListener('click', calculateEvenOperation);

function calculateEvenOperation() { 

  const operator = output.findOperator();

  const checkOperator = output.checkOperator();

  if (!checkOperator) return mathOperations.evenState = true;

  if (output.inputArr.at(-1) === operator) {
    
    output.inputArr.pop();

    output.showOutput();

  } else {

    console.log(`even operator: ${operator}`);

    const rightOperand = mathOperations.getRightOperand();

    switch (true) {

      case (operator === ' + '):
        mathOperations.numbers.push(rightOperand);
        console.log(` even math: ${mathOperations.numbers}`);
        mathOperations.addition();
        break;
    
      case (operator === ' - '):
        mathOperations.numbers.push(rightOperand);
        console.log(` even math: ${mathOperations.numbers}`);
        mathOperations.subtraction();
        break;
    
      case (operator === ' ÷ '):
        mathOperations.numbers.push(rightOperand);
        console.log(` even math: ${mathOperations.numbers}`);
        mathOperations.division();
        break;
    
      case (operator === ' x '):
        mathOperations.numbers.push(rightOperand);
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