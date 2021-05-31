class Calculator {
  constructor(prevOperandTxtEle, currOperandTxtEle) {
    this.prevOperandTxtEle = prevOperandTxtEle;
    this.currOperandTxtEle = currOperandTxtEle;
    this.reset();
  }

  reset() {
    this.prevOperand = "";
    this.currOperand = "0";
    this.operation = undefined;
    this.error = false;
  }

  delete() {
    if (this.currOperand !== "0") {
      this.currOperand = this.currOperand.toString().slice(0, -1);
    }
  }

  appendNumber(number) {
    if (number === "." && this.currOperand.includes(".")) return;
    if (this.currOperand.length > 12) return;
    this.currOperand = this.currOperand.toString() + number.toString();
  }

  choseOperation(operation) {
    if (this.currOperand === "") return;
    if (this.prevOperand !== "") this.compute();

    this.operation = operation;
    this.prevOperand = this.currOperand;
    this.currOperand = "0";
  }

  checkForError(current, operation) {
    if (current === 0 && operation === "/") {
      return (this.error = true);
    }
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
    if (computation.toString().length > 12) {
      computation = computation.toPrecision(12);
      console.log("hey");
    }
    this.checkForError(current, this.operation);
    this.currOperand = computation;
    this.operation = undefined;
    this.prevOperand = "";

    console.log(computation.toString().length);
  }

  getDisplayNumber(number) {
    if (!this.error) {
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split(".")[0]);
      const decimalDigits = stringNumber.split(".")[1];
      let integerDisplay;

      if (isNaN(integerDigits)) {
        integerDisplay = "";
      } else {
        integerDisplay = integerDigits.toLocaleString("en", { maximumFractionDigits: 0 });
      }

      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    } else {
      this.reset();
      return "division by zero";
    }
  }

  updateScreen() {
    this.currOperandTxtEle.innerText = this.getDisplayNumber(this.currOperand);
    if (this.operation != null) {
      this.prevOperandTxtEle.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`;
    } else {
      this.prevOperandTxtEle.innerText = "";
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
