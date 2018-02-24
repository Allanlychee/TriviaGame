var startScreen
var gameContent
var questionArray = [
    "<img class='img' src='assets/images/q1.PNG'>",
    "I'm a female. If Alba's daughter is my daughter's mother, what is the relationship between Alba and me?",
    "<img class='img' src='assets/images/squares.PNG'>",
    "One word in this list doesn't belong to the same group: Yen, Pound, Franc, Mark.",
    "How many legs do you see? <br><br> <img class='img' src='assets/images/elephant.png'>",
    "30 men take 20 days to complete a job working 9 hours a day. How many hours a day should 40 men work to complete the job?",
    "A spy is trying to send a secret message, we are trying to decode his message, we need your help! <br> If (shnoppy droppy groppy) means (mission dangerously executed) <br> And (swappy trappy droppy) means (abort mission immediately) <br> And (drippy groppy wippy) means (plan executed successfully) <br> Then what does 'shnoppy' mean?"
]
var answerArray = [
    ["57", "67", "47", "77"],
    ["She is my sister", "She is my aunt", "She is my mother", "She is my grandma"],
    ["28", "36", "40", "44"],
    ["Yen", "Pound", "Franc", "Mark"],
    ["4", "5", "6", "7"],
    ["6 hrs", "7 1/2 hrs", "8 hrs", "8 1/2 hrs"],
    ["Mission", "Executed", "Abort", "Dangerously"]
]
var correctAnswers = ["B. 67", "C. She is my mother", "C. 40", "D. Mark", "B. 5", "B. 7 1/2 hrs", "D. Dangerously"]
var NbrQuestions = 0 // counter to end game when all questions have been answered
var userChoice // variable for matching user choice to correct answer array
var timer // variable for counting down
var TimeCounter = 30 // Set time ceiling
var correctAns = 0 // # of Correct Answers
var wrongAns = 0 // # of Wrong Answers
var noResponse = 0 // # of timeouts or unanswered questions

$(document).ready(function () {
    // Create a function that creates the start button and beginning screen

    function start() {
        startScreen = "<p class='text-center button-container'><a class='btn btn-primary btn-lg btn-block text-center start-button'>Start Game</a></p>"
        $(".content").html(startScreen)
    }
    start()

    // Create a function that starts the game when start button is clicked
    $("body").on("click", ".start-button", function (event) {
        event.preventDefault()
        GameHTML()
        clock()
    })

    // Create a function that compares user choice with correct answer 
    $("body").on("click", ".answer", function (event) {
        userChoice = $(this).text()
        if (userChoice === correctAnswers[NbrQuestions]) {
            clearInterval(timer)
            correct()
        }
        else {
            clearInterval(timer)
            wrong()
        }
    })

    // Reset game
    $("body").on("click", ".reset-button", function (event) {
        resetGame()
    })

})  
// End document ready function

function GameHTML() {
    gameContent = "<h3>Question #" + (NbrQuestions+1) + "</h3>" + "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[NbrQuestions] + "</p><p class='first-answer answer'>A. " + answerArray[NbrQuestions][0] + "</p><p class='answer'>B. " + answerArray[NbrQuestions][1] + "</p><p class='answer'>C. " + answerArray[NbrQuestions][2] + "</p><p class='answer'>D. " + answerArray[NbrQuestions][3] + "</p>"
    $(".content").html(gameContent)
}
function timeOut() {
    noResponse++
    gameContent = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + TimeCounter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[NbrQuestions] + "</p>" + "<img class='img-wrong' src='assets/images/michaelno.gif'>"
    $(".content").html(gameContent)
    setTimeout(wait, 2000)
}

function correct() {
    correctAns++
    gameContent = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + TimeCounter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[NbrQuestions] + "</p>" + "<img class='img-right' src='assets/images/jonahyay.gif'>"
    $(".content").html(gameContent)
    setTimeout(wait, 2000)
}

function wrong() {
    wrongAns++
    gameContent = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + TimeCounter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[NbrQuestions] + "</p>" + "<img class='img-wrong' src='assets/images/michaelno.gif'>"
    $(".content").html(gameContent)
    setTimeout(wait, 5000)
}

function wait() {
    if (NbrQuestions < 6) {
        NbrQuestions++
        GameHTML()
        TimeCounter = 30
        clock()
    }
    else {
        endGame()
    }
}

function clock() {
    timer = setInterval(thirtySeconds, 1000)
    function thirtySeconds() {
        if (TimeCounter === 0) {
            clearInterval(timer)
            timeOut()
        }
        if (TimeCounter > 0) {
            TimeCounter--
        }
        $(".timer").html(TimeCounter)
    }
}

function endGame() {
    gameContent = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + TimeCounter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctAns + "</p>" + "<p>Wrong Answers: " + wrongAns + "</p>" + "<p>Unanswered: " + noResponse + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button'>Reset The Quiz!</a></p>"
    $(".content").html(gameContent)
}

function resetGame() {
    NbrQuestions = 0
    correctAns = 0
    wrongAns = 0
    noResponse = 0
    TimeCounter = 30
    GameHTML()
    clock()
}

