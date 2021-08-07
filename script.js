class Calculator {//Calling the class calculator to begin the start of the equation
  constructor(previousOperandTextElement, currentOperandTextElement) {//Using construction intializes any other methods that can be called on an object
    this.previousOperandTextElement = previousOperandTextElement//Allowing output to user
    this.currentOperandTextElement = currentOperandTextElement//Allowing output to user
    this.clear()//Clearing any inputs
  }

  clear() {//Setting up function for clearing inputs
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {//Setting up function for deleting inputs
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {//Setting up if statement for changing the number displayed
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {//Setting up if statement for creating the sum for the calculator
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {//Setting up the if statement for inputted operators 
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

  getDisplayNumber(number) {//Setting up validation for decimal numbers and whole numbers
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

  updateDisplay() {//Setting up validation for displaying the correct numbers and operator to the user whilst using the calculator
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


const numberButtons = document.querySelectorAll('[data-number]')//Creating a variable for the buttons with numbers
const operationButtons = document.querySelectorAll('[data-operation]')//Creating a variable for the operator buttons
const equalsButton = document.querySelector('[data-equals]')//Creating a variable for the equals button
const deleteButton = document.querySelector('[data-delete]')//Creating a variable for the delete button
const allClearButton = document.querySelector('[data-all-clear]')//Creating a variable for the all clear button
const previousOperandTextElement = document.querySelector('[data-previous-operand]')//Creating a variable for reading for the first number
const currentOperandTextElement = document.querySelector('[data-current-operand]')//Creating a variable for reading the second number

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)//Creating a variable for the calculator to function with the buttons

numberButtons.forEach(button => {//Setting up the variable for number buttons for user inputs
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {//Setting up the variable for operator buttons for user inputs
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {//Setting up the variable for equals button for user inputs
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {//Setting up the variable for all clear button for user inputs
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {//Setting up the variable for delete button for user inputs
  calculator.delete()
  calculator.updateDisplay()
})