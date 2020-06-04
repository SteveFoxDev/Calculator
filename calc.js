const readout = document.querySelector('.display').textContent;
const nums = document.querySelectorAll('.num');
const operator = document.querySelectorAll('.opr');
const equal = document.querySelector('#equals');
const clear = document.querySelector('#clear');
const neg = document.querySelector('#neg');
const percent = document.querySelector('#percent');

// add variable neg after if result and if oprset add if
// to check if neg and fix the readout reset there

let opr;
let oprSet = false;
let result = true;
let resultNum;
let firstNum = '';
let secondNum = '';
let eqReady = false;
let specialOp = false;

function setNum(e){
  if(result && !specialOp){
      firstNum = parseFloat(readout.textContent);
      readout.textContent = '';
    }
  if(oprSet){
      readout.textContent = '';
      removeClass();
      oprSet = false;
      eqReady = true;
  }
    result = false;
    // get number from button click
    // const newNum = parseFloat(e.target.dataset.num);
    newNum = e.target.dataset.num;
    readout.textContent = readout.textContent + newNum;
}

function setOperator(e){
    if(oprSet){
      removeClass();
    }
    if(eqReady){
      secondNum = parseFloat(readout.textContent);
      equals();
    }
    firstNum = parseFloat(readout.textContent);
    opr = e.target.dataset.opr;
    e.target.classList.add("clicked");
    oprSet = true;
}

function removeClass(){
  operator.forEach(function(i){
    if(i.classList.contains("clicked")){
      i.classList.remove("clicked");
    }
  });
}

function negateNum(){
  if(readout.textContent.includes('-')){
    readout.textContent = readout.textContent.substring(1);
  } else {
    readout.textContent = '-' + readout.textContent;
    specialOp = true;
  }
}

function percentage(){
  readout.textContent = parseFloat(readout.textContent) * 0.01;
}

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

function reset(){
  oprSet = false;
  result = true;
  eqReady = false;
  secondNum = '';
  specialOp = false;
}
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

nums.forEach(num => num.addEventListener('click', setNum));
operator.forEach(op => op.addEventListener('click', setOperator));
equal.addEventListener('click', equals);
clear.addEventListener('click', clearAll);
neg.addEventListener('click', negateNum);
percent.addEventListener('click', percentage);
