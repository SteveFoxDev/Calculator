const readout = document.querySelector('.display');
const nums = document.querySelectorAll('.num');
const operator = document.querySelectorAll('.opr');
const equal = document.querySelector('#equals');
const clear = document.querySelector('#clear');
const neg = document.querySelector('#neg');
const percent = document.querySelector('#percent');

let opr;
let oprSet = false;
let result = true;
let resultNum;
let firstNum = '';
let secondNum = '';
let eqReady = false;
let specialOp = false;

function setNum(e){
  // clear result when user clicks number, unless they click negative
  if(result && !specialOp){
      firstNum = parseFloat(readout.textContent);
      readout.textContent = '';
    }
  // operator is set, so first part of equation is saved, clear display, reset opr, and flag equation ready
  if(oprSet){
      readout.textContent = '';
      removeClass();
      oprSet = false;
      eqReady = true;
  }
  // set result to false so display won't be cleared when number click
  result = false;
  // get number from button click
  newNum = this.dataset.num;
  // push number to display
  readout.textContent = readout.textContent + newNum;
}

function setOperator(e){
  // remove CSS from op button
  if(oprSet){
    removeClass();
  }
  // if operator is clicked when eq is ready, save number and send to equals()
  if(eqReady){
    secondNum = parseFloat(readout.textContent);
    equals();
  }
  // save number typed in before operator clicked
  firstNum = parseFloat(readout.textContent);
  // set operator
  opr = this.dataset.opr;
  // add CSS
  this.classList.add('clicked');
  // flag oprSet so readout will be cleared when number is clicked after operator
  oprSet = true;
}

// toggles CSS on operator buttons
function removeClass(){
  operator.forEach(function(i){
    if(i.classList.contains("clicked")){
      i.classList.remove("clicked");
    }
  });
}

// toggles negative indicator in display and equation
function negateNum(){
  if(readout.textContent.includes('-')){
    readout.textContent = readout.textContent.substring(1);
  } else {
    readout.textContent = '-' + readout.textContent;
    specialOp = true;
  }
}

// percentage button logic
function percentage(){
  readout.textContent = parseFloat(readout.textContent) * 0.01;
}

// computes equation, displays result, resets for continued equation
function equals(){
  if(eqReady){
    switch(opr){
      case "plus":
      resultNum = firstNum + secondNum;
      readout.textContent = resultNum;
      reset();
      break;

      case "minus":
      resultNum = firstNum - secondNum;
      readout.textContent = resultNum;
      reset();
      break;

      case "div":
      resultNum = firstNum / secondNum;
      readout.textContent = resultNum;
      reset();
      break;

      case "mult":
      resultNum = firstNum * secondNum;
      readout.textContent = resultNum;
      reset();
      break;
    }
  } else {
      return;
  }
}

// reset for continued equation after equals
function reset(){
  oprSet = false;
  result = true;
  eqReady = false;
  secondNum = '';
  specialOp = false;
}

// resets All
function clearAll(){
  opr = '';
  specialOp = false;
  oprSet = false;
  result = true;
  resultNum = '';
  firstNum = '';
  secondNum = '';
  eqReady = false;
  readout.textContent = '0';
  removeClass();
}

// Event Listeners
nums.forEach(num => num.addEventListener('click', setNum));
operator.forEach(op => op.addEventListener('click', setOperator));
equal.addEventListener('click', equals);
clear.addEventListener('click', clearAll);
neg.addEventListener('click', negateNum);
percent.addEventListener('click', percentage);
