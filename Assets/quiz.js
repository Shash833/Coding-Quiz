//HTML elements for intro page//
var button = this.document.querySelector(".button")
var intro = this.document.querySelector("#intro")
var highscoreNav = this.document.querySelector("#highscoresNav")
//HTML elements for quiz pages//
var quizPage = this.document.querySelector("#quiz")
var quizTitle = this.document.querySelector(".title")
var quizQuestion = this.document.querySelector("#text")
var quizResult = this.document.querySelector("#result")
var answerContainer = this.document.querySelector("#answer")
//HTML elements for score page//
var scorePage = this.document.querySelector("#userScore")
var scoreTitle = this.document.querySelector("#scoreTitle")
var userScore = this.document.querySelector("#score")
var scoreForm = this.document.querySelector("#scoreForm")
//HTML elements for highscore page//
var highScoreTitle = document.querySelector("#highscoreTitle")
var ladder = this.document.querySelector("#ladder")
var finalButtons = this.document.querySelector("#HSButtons")

//Array of quiz questions and answers//
var quizArray = [
    {
        title: "Question 1",
        text: "39 === 39 ",
        answers: ["true", "false"],
        answer: "true"
    },
    {
        title: "Question 2",
        text: "Select the semantic element",
        answers: ["<div>", "<a>", "<nav>", "<span>"],
        answer: "<nav>"
    },
    {
        title: "Question 3",
        text: "#text is a class selector",
        answers: ["true", "false"],
        answer: "false"
    },
    {
        title: "Question 4",
        text: "HTML stands for Hypertext Markup Language",
        answers: ["true", "false"],
        answer: "true"
    },
    {
        title: "Question 5",
        text: "To return true, 7=== __.",
        answers: [" '7' ", "7", "Both 1 and 2", "Neither 1 or 2"],
        answer: "7"
    },
    {
        title: "Question 6",
        text: ".next is a class selector",
        answers: ["true", "false"],
        answer: "true"
    }
]

//Timer function, will begin after quiz() is called//
var secCount = 60;
function countdown() {
    var timeout = setInterval(function () {
        seconds.textContent = secCount;
        secCount--;
        //End quiz if timer=0 and show score page//
        if (secCount <= 0) {
            seconds.textContent = "0"
            clearInterval(timeout);
            scorepage()
        }
        else if (secCount < 10) {
            seconds.textContent = "0" + secCount
        }
    }, 1000);
}

//Code for quiz, function is called when 'Start Quiz' button is clicked//
var currentQuestionIndex = 0
var correct = 0
var incorrect = 0
var timeStart = 0;
button.addEventListener("click", function quiz() {
    //To start timer after quiz begins, condition set so timer is only activated once//
    if (timeStart == 0) {
        countdown()
        timeStart = 1;
    }
    //Clear introduction and previous array items(if any)//
    intro.innerHTML = ""
    quizResult.innerHTML = ""
    answerContainer.innerHTML = ""

        //When user has answered 6 questions, counter will be set to 0 and quiz will end//
    if (currentQuestionIndex >= 6) {
        secCount = 0
        quizPage.innerHTML = ""
        return;
    }
    //Apply text from quiz array into HTML elements//
    quizTitle.innerText = quizArray[currentQuestionIndex].title;
    quizQuestion.innerText = quizArray[currentQuestionIndex].text;
    var answerOptions = quizArray[currentQuestionIndex].answers
    //create list elements for answer options//
    for (var i = 0; i < answerOptions.length; i++) {
        let selectAnswer = document.createElement("li");
        selectAnswer.innerText = answerOptions[i];
        answerContainer.appendChild(selectAnswer);
        //Click event listener for user's selected answer. When answer is clicked increment correct or incorrect variable, display result,increment currentQuestionIndex and move onto next question//
        selectAnswer.addEventListener("click", function () {
            if (selectAnswer.innerText == quizArray[currentQuestionIndex].answer) {
                correct++;
                quizResult.innerText = "Correct!"
                currentQuestionIndex++
                setTimeout(() => { quiz() }, 1000) //1 second delay to display message before moving to next question//
            } else {
                incorrect++;
                quizResult.innerText = "Incorrect! 10 seconds have been deducted"
                currentQuestionIndex++
                secCount = secCount - 10; //Deduct 10 seconds if answer is wrong//
                setTimeout(() => { quiz() }, 1000) //1 second delay to display message before moving to next question//
            }
        });
    }

})

//Score page (is called when the timer=0)//
var newScore = null
var resultsArray = []
function scorepage() {
    quizPage.innerHTML = ""; //clear quiz page//
    scoreTitle.innerText = "Score:"
    userScore.innerText = "Your final mark is: " + correct;
    //Score input form with input box and submit button//
    var label = document.createElement("label")
    var input = document.createElement("input")
    var submit = document.createElement("input")
    label.innerText = "Write your initials here to add your score:  ";
    submit.setAttribute("type", "submit")
    scoreForm.appendChild(label)
    scoreForm.appendChild(input)
    scoreForm.appendChild(submit)
    //Obtain previous results from local storage and update results array//
    var oldResults = JSON.parse(localStorage.getItem("QuizResults"))
    if (oldResults !== null) {
        resultsArray = oldResults
    }
    //After submit button is clicked, store user initials and score to local storage//
    submit.addEventListener("click", function () {
        //Obtain user initials and score//
        var user = input.value.trim().toUpperCase();
        newScore = correct + "   - " + user
        //Update resultsArray to include new score//
        resultsArray.push(newScore)
        //Add updated resultsArray to localStorage//
        localStorage.setItem("QuizResults", JSON.stringify(resultsArray))
        //Clear scorepage//
        scorePage.innerHTML = ""
        //Reveal Highscore page//
        highscore();
    })
}

//To access highscore page from navigation bar//
highscoreNav.addEventListener("click", function () {
    ladder.innerHTML = ""
    finalButtons.innerHTML = ""
    resultsArray = JSON.parse(localStorage.getItem("QuizResults"))
    highscore()
})

//Highscore page://
function highscore() {
    //Clear other sections//
    intro.innerHTML = "";
    quizPage.innerHTML = "";
    //Highscore page title//
    highScoreTitle.innerText = "Highscores";
    //Create 'Clear highscores' and 'Go back' buttons//
    var clearButton = document.createElement("button")
    var goBackButton = document.createElement("button")
    clearButton.innerText = "Clear Highscores"
    goBackButton.innerText = "Go Back"
    finalButtons.appendChild(goBackButton)
    finalButtons.appendChild(clearButton)
    //When "Go Back" button is clicked, introduction page is reloaded//
    goBackButton.addEventListener("click", function () { window.location.reload() })
    //When "Clear Highscores" button is clicked, Local storage "QuizResults" is cleared//
    clearButton.addEventListener("click", function () {
        localStorage.removeItem("QuizResults");
        ladder.innerHTML = ""
    })
    //Display results If resultsArray is not empty// 
    //Sort resultsArray in descending order and create list elements for each user score//
    if (resultsArray && resultsArray.length > 0) {
        resultsArray = resultsArray.sort().reverse()
        for (var s = 0; s < resultsArray.length; s++) {
            let scoreItem = document.createElement("li");
            scoreItem.innerText = resultsArray[s];
            ladder.appendChild(scoreItem)
            scoreItem.setAttribute("class", "HS")
        }
    }
    //If the array is empty...//
    else { ladder.innerText = "There are no results to display" }
}
