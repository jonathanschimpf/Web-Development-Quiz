// ****** DECLARATION OF VARIABLES ******

var quizBeginsButton = document.querySelector("#quizBeginsButton");
var highScoresArchive = document.querySelector("#highScoresArchive");
var highScoresClick = document.querySelector("#highScoresClick");
var highScoresList = document.querySelector(".highScoresList");
var timeLeft = document.querySelector("#timeLeft");
var welcomeSection = document.querySelector("#welcomeSection");
var questionSection = document.querySelector(".questionSection");
var presentQuestion = document.querySelector("#presentQuestion");
var endQuizGreeting = document.querySelector("#endQuizGreeting");
var initialsSection = document.querySelector(".initialsSection");
var initialsInput = document.querySelector("#initialsInput");
var submitButtonClick = document.querySelector(".submitButtonClick");
var choiceButtons = document.querySelector(".choiceButtons");
var firstChoice = document.querySelector("#firstChoice");
var secondChoice = document.querySelector("#secondChoice");
var thirdChoice = document.querySelector("#thirdChoice");
var fourthChoice = document.querySelector("#fourthChoice");
var timeRemaining = 90;
var currentQuestion = 0;
var finalScoresDisplayed = [];

// here is where the time function exists, it is initially invisible. 
// it is activated when the user clicks start and calls on the startTimer function.
// the timer beging at 90 seconds (timeRemaining), and counts down backwards.

function startTimer() {
    timeLeft.style.visibility = "visible";

    var timerInterval = setInterval(function () {
        timeRemaining--;
        timeLeft.textContent = "Timer: " + timeRemaining;

        if ((currentQuestion === arrayOfQuestions.length)) {
            clearInterval(timerInterval);
            var usersTime = timeRemaining;
            endQuizGreeting.textContent = ("You completed the quiz with " + usersTime + " seconds left!");
        }

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            endQuizGreeting.textContent = ("You completed the quiz with " + usersTime + " seconds left!");
        }
    }, 1000);
}



// ****** QUIZ CONTENT ******


// this hides the welcomeSection menu page section and reveals the questions section (both within index.html)
// questions are presented while starting the timer by calling on the startTimer and askQuestions functions.
// the timer begins to count down as a result, and the user is presented with multiple choices to pick from.

function startQuiz() {
    welcomeSection.style.display = "none";
    questionSection.style.display = "block";
    currentQuestion = 0;
    startTimer();
    askQuestions();
};

// when the start button (quizBeginsButton) is clicked it calls on the startQuiz function

quizBeginsButton.addEventListener("click", startQuiz);

// this function displays the first question object within the arrayOfQuestions array.
// this loops through each one of the questions for the length of the arrayOfQuestions array.

function askQuestions() {
    if (currentQuestion === arrayOfQuestions.length) {
        questionSection.style.display = "none";
        initialsSection.style.display = "block";
    }
    presentQuestion.textContent = arrayOfQuestions[currentQuestion].quizQuestion;
    firstChoice.textContent = arrayOfQuestions[currentQuestion].potentialAnswers[0];
    secondChoice.textContent = arrayOfQuestions[currentQuestion].potentialAnswers[1];
    thirdChoice.textContent = arrayOfQuestions[currentQuestion].potentialAnswers[2];
    fourthChoice.textContent = arrayOfQuestions[currentQuestion].potentialAnswers[3]
}

// user selects their choice via a button, logs if the answer is correct or wrong in the console 
// calls back askQuestions function to advance to the next question after a selection is made

choiceButtons.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
        if (event.target.textContent === arrayOfQuestions[currentQuestion].correctAnswer) {
            currentQuestion++;

        } else {
            currentQuestion++;
            timeRemaining = timeRemaining - 10;

        }
        askQuestions();
    }
});

// archive is hidden until clicked, then displays results.

highScoresClick.addEventListener("click", function (event) {
    if (highScoresList.style.display === "none") {
        highScoresList.style.display = "block";
        highScoresArchive.style.display = "block";
        storePlayerInfo();
    } else {
        highScoresList.style.display = "none";
        highScoresArchive.style.display = "none";

    }
})

// here is where the submit button functionality exists (submitButtonClick)..
// once the user enters their intitals and clicks submit the score ititials are archived.
// this allows visibility of the start screen again after submission (welcomeSection).

submitButtonClick.addEventListener("click", function (event) {
    event.preventDefault();
    var usersTime = timeRemaining;
    var usersInitials = initialsInput.value;

    // users score and intitials added here via JSON stringify.

    finalScoresDisplayed.push({ "initials": usersInitials, "time": usersTime });
    localStorage.setItem("final score", JSON.stringify(finalScoresDisplayed));
    initialsSection.style.display = "none";
    welcomeSection.style.display = "block";
    timeLeft.style.visibility = "hidden";
    timeRemaining = 90;
    timeLeft.textContent = "Timer: 90";
    highScoresList.style.display = "none";
    highScoresArchive.style.display = "none";
})

// user score information is archived on the page along with intials
// via JSON.parse

function storePlayerInfo() {
    highScoresArchive.innerHTML = "";
    finalScoresDisplayed = JSON.parse(localStorage.getItem("final score"));

    //JSON.parse removes local storage information.
    // the information is then placed on the high scores list
    //each new score is added to the list.

    console.log(finalScoresDisplayed);
    for (var i = 0; i < finalScoresDisplayed.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = (finalScoresDisplayed[i].initials) + " : " + "Finished with " + finalScoresDisplayed[i].time + " seconds left!";
        highScoresArchive.append(li);
    }
}
