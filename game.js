const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const progressBar = document.getElementById("progress-barfill");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = {};

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple").then(res => {
    return res.json();
}).then(loadedQuestions => {
    questions = loadedQuestions.results.map(loadedQuestion => {
        const formattedQuestion = {
            question: loadedQuestion.question
        };
        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
        answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

        answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index + 1)] = choice;
        })

        return formattedQuestion;
        
    });

    startgame();
}).catch(err => {
    console.log(err);
});

const correctBonus = 10;
const maxQuestions = 10;

startgame = () => {
    questionCounter = 0;
    score = 0;
    scoreText.innerText=score
    availableQuestions = [...questions];
    scoreText.innerText = score;
    localStorage.setItem("CurrentScore", score);
    getNewQuestion();
       loader.classList.add("hidden");
    game.classList.remove("hidden");
    
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > maxQuestions) {
        return window.location.assign("./end.html");
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + maxQuestions;
    progressBar.style.width = (questionCounter / maxQuestions) * 100 +"%";
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;

}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if (classToApply == "correct") {
            getscore(correctBonus);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

getscore = num => {
    score += num;
    scoreText.innerText = score;
    localStorage.setItem("CurrentScore", score);
}

