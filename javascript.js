const numberButtons = document.querySelectorAll('[number]')
const operationButtons = document.querySelectorAll('[operation]')
const equalsButton = document.querySelector('[equals]')
const allClearButton = document.querySelector('[all-clear]')
const resetButton = document.querySelector('[reset]')
const previousOutput = document.querySelector('[previous-output]')
const currentOutput = document.querySelector('[current-output]')

class Calculator {

  constructor(previousOperand, currentOperand) {
    this.previousOperandTextElement = previousOperand
    this.currentOperandTextElement = currentOperand
    this.clear()
  }

  reset() {
    this.currentOperand = '0'
    this.previousOperand = ''
    this.operation = undefined
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }



  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.calculate()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  calculate() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }

    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}

const calculator = new Calculator(previousOutput, currentOutput)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.calculate()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})
resetButton.addEventListener('click', button => {
  calculator.reset()
  calculator.updateDisplay()
})


//Keyboard
document.addEventListener('keydown', function (event) {

  let numbers = /[0-9]/g;
  let operators = /[+\-*\/]/g

  if (event.key.match(numbers)) {
    event.preventDefault();
    calculator.appendNumber(event.key)
    calculator.updateDisplay()
  }
  if (event.key === '.') {
    event.preventDefault();
    calculator.appendNumber(event.key)
    calculator.updateDisplay()
  }
  if (event.key.match(operators)) {
    event.preventDefault();
    calculator.chooseOperation(event.key)
    calculator.updateDisplay()
  }
  if (event.key === 'Enter' || event.key === '=') {
    event.preventDefault();
    calculator.calculate()
    calculator.updateDisplay()
  }
  if (event.key === "Delete") {
    event.preventDefault();
    calculator.reset()
    calculator.updateDisplay()
  }

});