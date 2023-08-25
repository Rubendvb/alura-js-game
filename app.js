let numbersExists = []
let setNumber = 10
let secretNumber = randomNumber()
let attempt = 1

function showText(tag, text) {
  let field = document.querySelector(tag)
  field.innerHTML = text

  responsiveVoice.speak(text, 'Brazilian Portuguese Female', { rate: 1.2 })
}

function initialText() {
  showText(
    'h1',
    'Adivinhe o <span class="container__texto-azul">numero secreto</span>'
  )
  showText('p', 'Escolha um número entre 1 a 10')
}

function verificarChute() {
  let chute = document.querySelector('input').value
  let text = attempt > 1 ? 'tentativas' : 'tentativa'

  if (chute == secretNumber) {
    showText('h1', 'Acertou')
    showText('p', `Você descobriu o numero secreto com ${attempt} ${text}`)

    document.querySelector('input').setAttribute('disabled', true)
    document.getElementById('reiniciar').removeAttribute('disabled')
  } else {
    if (chute > secretNumber) {
      showText('p', 'O numero secreto é menor')
    } else {
      showText('p', 'O numero secreto é maior')
    }
    clearInput()
  }

  attempt++
}

function randomNumber() {
  let number = parseInt(Math.random() * setNumber + 1)
  let quantityNumbers = numbersExists.length

  if (quantityNumbers == setNumber) {
    numbersExists = []
  }

  if (numbersExists.includes(number)) {
    return randomNumber()
  } else {
    numbersExists.push(number)

    console.log(numbersExists)
    return number
  }
}

function clearInput() {
  let input = document.querySelector('input')

  input.value = ''

  input.focus()
}

function restartGame() {
  secretNumber = randomNumber()

  attempt = 1

  initialText()

  document.getElementById('reiniciar').setAttribute('disabled', true)
  document.querySelector('input').removeAttribute('disabled')

  clearInput()
}
