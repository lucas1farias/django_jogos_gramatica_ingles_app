

// Miscelânia: Muda a cor da borda, do texto, da sombra do texto do elemento "questionEl"
  function rgb() {
    const inks = [...Array(256).keys()]

    let red = Math.floor(Math.random() * inks.length)
    let green = Math.floor(Math.random() * inks.length)
    let blue =Math.floor(Math.random() * inks.length)

    return `rgba(${inks[red]},${inks[green]},${inks[blue]})`
  }

  function createLocalVar({localVarLabel, newValue}) {
    return localStorage.setItem(localVarLabel, newValue)
  }

  function getLocalVar({localVarLabel}) {
    return localStorage.getItem(localVarLabel)
  }

  /*
  O algoritmo recarrega a página a cada vez que o jogador digita algo no input
  A cada vez que o jogador digita, "scorePlus" (acerto) e "scoreMinus" (erro) podem aumentar +1
  PROBLEMA        || ao recarregar, o algoritmo reseta, então "scorePlus" e "scoreMinus" também resetam (0)
  SOBRE RESET     || ele acontece só no algoritmo, mas os valores em "localStorage" são mantidos
  PROBLEMA        || "scorePlus" e "scoreMinus" sempre serão 0 e 1 no algoritmo (1 no loop, e 0 ao recarregar da página)
  SOLUÇÃO PARCIAL || "scorePlus" e "scoreMinus" recebem os seus valores em "localStorage" via "getLocalVar"
  NOVO PROBLEMA   || por causa do "reset" do algoritmo, ao invés de aumentar (1...2...3), "localStorage" cria (1...11...111)
  MOTIVO          || "scorePlus" e "scoreMinus" aumentam de 0 p/ 1, e voltam p/ 0 no "reset", criando (1...11...111)
  SOLUÇÃO         || Tratar os dados string (pelos 2 ifs abaixo), convertendo (1...11...111) p/ (1...2...3)
  EXEMPLO         || scorePlus = '1111111' passam por 3 tratamentos abaixo, e o exemplo se torna 7 (todos os valores +)
  */
  let scorePlus = 0
  scorePlus = getLocalVar({localVarLabel: 'scorePlus'})

  let scoreMinus = 0
  scoreMinus = getLocalVar({localVarLabel: 'scoreMinus'})


  // Para a contagem correta, uma sequência de manipulações é feita
  // ex: let scorePlus = '1'
  // A cada resposta certa: scorePlus = '11' ... scorePlus = '111'
  // scoresArray = ['1', '1', '1'] ... scoreAsArrayOfNumbers = [1, 1, 1] ... sumOfScores = 3
  if (typeof scorePlus === 'string') {
    let scoreAsArray = [...scorePlus]
    let scoreAsArrayOfNumbers = scoreAsArray.map(Number)
    let sumOfScores = scoreAsArrayOfNumbers.reduce((a, b) => a + b, 0)
    scorePlus = sumOfScores
  }

  if (typeof scoreMinus === 'string') {
    let scoreAsArray = [...scoreMinus]
    let scoreAsArrayOfNumbers = scoreAsArray.map(Number)
    let sumOfScores = scoreAsArrayOfNumbers.reduce((a, b) => a + b, 0)
    scoreMinus = sumOfScores
  }

  // Elemento não pertencente as vars de contexto Django
  let resetScoresBtnEl = document.getElementById('clear-data')

  // Conjunto de vars de contexto Django capturadas como elementos JS
  // O algoritmo é criado em (_app/views.py/IndexView/init)
  // Os dados do algoritmo são usados em (_app/views.py/IndexView/get_context_data), pela var "context"
  let rightAnswer = document.getElementById('accurate')
  let wrongAnswer = document.getElementById('mistaken')
  let questionEl = document.getElementById('question')
  let inputAnswerEl = document.getElementById('answer')
  let answerEl = document.getElementById('hidden-correct-answer')

  inputAnswerEl.setAttribute('autocomplete', 'off')

  // Recarregar página usando JS (sem clicar no ícone do navegador)
  function reloadPage() {
    return window.location.reload()
  }

  // O que é feito com base na resposta do jogador
  // Antes dessa função, eram usadas vars globais dentro dos "if" ao fundo
  // A função foi feita p/ evitar repetição de códigos nos "if" ao fundo
  function proceduresAfterPlayerOutput({scoreEl, localVarName}) {
    scoreEl += 1
    createLocalVar({localVarLabel: localVarName, newValue: scoreEl})
    reloadPage()
  }

  // Observar a resposta do jogador via valor do input "inputAnswerEl"
  // PROBLEMA: Antes da primeira resposta do jogador, o valor de "vars localStorage" é "null"
  // As duas primeiras condições mudam esse valor padrão (vars localStorage atribuídas as vars dentro das condições )
  // Após a primeira resposta, essas condições se tornam obsoletas
  let loop = setInterval(() => {

    // Resetando os valores no "localStorage" e no algoritmo
    resetScoresBtnEl.addEventListener('click', () => {
      createLocalVar({localVarLabel: 'scorePlus', newValue: '0'})
      createLocalVar({localVarLabel: 'scoreMinus', newValue: '0'})
      scorePlus = '0'
      scoreMinus = '0'
    })

    if (scorePlus === null) {
      scorePlus = '0'
    }

    if (scoreMinus === null) {
      scoreMinus = '0'
    }

    // Com as "vars localStorage" tratadas nos 2 "ifs" do topo, os dados são passados p/ esses elementos
    rightAnswer.textContent = scorePlus + ' acerto(s)'
    wrongAnswer.textContent = scoreMinus + ' erro(s)'

    // Jogador dá a resposta certa
    if (inputAnswerEl.value == answerEl.textContent) {
      proceduresAfterPlayerOutput({scoreEl: scorePlus, localVarName: 'scorePlus'})
    }

    // Jogador dá uma resposta errada e input não deve estar vazio
    if (inputAnswerEl.value != answerEl.textContent && inputAnswerEl.value != '') {
      proceduresAfterPlayerOutput({scoreEl: scoreMinus, localVarName: 'scoreMinus'})
    }

    if (inputAnswerEl.value === '') {
      questionEl.style.border = `${rgb()} solid 1px`
      questionEl.style.color = rgb()
      questionEl.style.textShadow = `0 0 10px ${rgb()}`
    }
  }, 1000)
