class Calculator {
  constructor(prevOperandTxtEle, currOperandTxtEle) {
    this.prevOperandTxtEle = prevOperandTxtEle;
    this.currOperandTxtEle = currOperandTxtEle;
    this.reset();
  }

  reset() {
    this.prevOperand = "";
    this.currOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currOperand = this.currOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currOperand.includes(".")) return;
    this.currOperand = this.currOperand.toString() + number.toString();
  }

  choseOperation(operation) {
    if (this.currOperand === "") return;
    if (this.prevOperand !== "") {
      this.compute();
    }

    this.operation = operation;
    this.prevOperand = this.currOperand;
    this.currOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.prevOperand);
    const current = parseFloat(this.currOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "-":
        computation = prev - current;
        break;
      case "+":
        computation = prev + current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currOperand = computation;
    this.operation = undefined;
    this.prevOperand = "";
  }

  getDisplayNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  updateScreen() {
    this.currOperandTxtEle.innerText = this.getDisplayNumber(this.currOperand);
    if (this.operation != null) {
      this.prevOperandTxtEle.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`;
    }
  }
}

const numberButtons = document.querySelectorAll(".btn-num");
const operationButtons = document.querySelectorAll(".btn-operation");
const deleteButton = document.querySelector(".btn-delete");
const resetButton = document.querySelector(".btn-reset");
const equalButton = document.querySelector(".btn-equal");
const prevOperandTxtEle = document.querySelector(".prev-operand");
const currOperandTxtEle = document.querySelector(".curr-operand");

const calculator = new Calculator(prevOperandTxtEle, currOperandTxtEle);

//Num buttons

numberButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    calculator.appendNumber(btn.innerText);
    calculator.updateScreen();
  });
});

//Reset

resetButton.addEventListener("click", () => {
  calculator.reset();
  calculator.updateScreen();
});

equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateScreen();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateScreen();
});

//Operations buttons

operationButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    calculator.choseOperation(btn.innerText);
    calculator.updateScreen();
  });
});
