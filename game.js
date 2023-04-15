const question = document.querySelector('#question')
const choices =Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')


let currentQuestion = {}
let acceptingAnswer = true
let score = 0
let questionCounter = 0
let availableQuestion = []

let questions = [
    {
        question: "what is 2+2?",
        choice1: '2',
        choice2: '7',
        choice3: '4',
        choice4: '10',
        answer: 3
    },
    {
        question: "what is 4*6+4?",
        choice1: '10',
        choice2: '28',
        choice3: '40',
        choice4: '24',
        answer: 2
    },
    {
        question: "what is 8/2?",
        choice1: '2',
        choice2: '6',
        choice3: '4',
        choice4: '5',
        answer: 3
    },
    {
        question: "what is 2^3*6?",
        choice1: '48',
        choice2: '72',
        choice3: '64',
        choice4: '32',
        answer: 1
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = ()=>{
    questionCounter= 0
    score = 0
    availableQuestion = [...questions]
    getNewQuestion()
}

getNewQuestion = () =>{
    if(availableQuestion.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;

    const questionIndex = Math.floor(Math.random()*availableQuestion.length)
    currentQuestion = availableQuestion[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice=>{
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion['choice'+ number]
    })

    availableQuestion.splice(questionIndex, 1)

    acceptingAnswer = true
}

choices.forEach(choice =>{
    choice.addEventListener('click', e=>{
        if(!acceptingAnswer) return
        

        acceptingAnswer = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1000)
    })
})

incrementScore = num =>{
    score += num
    scoreText.innerText = score
}

startGame()