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

//const allBtn = document.querySelectorAll('button');

// Input output block 12max

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
  
  outputPara.textContent = '0';

//  console.log(inputArr);

});

digitsBtn.forEach((btn) => { 

  btn.addEventListener('click', showOutput);

});

function showOutput() { 

  let output = inputArr.join('');

 // console.log(output);

  outputPara.textContent = output;

 // stopAtMaxOutput();

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