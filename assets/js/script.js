// List of Questions and Answers
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        options: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },

    {
        title: "The condition in an if / else statement is enclosed within ____.",
        options: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },

    {
        title: "Arrays in JavaScript can be used to store ____.",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },

    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        options: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes" 
    },

    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log"
    }];

// DOM Elements
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-score");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");
var reStartBtn = document.querySelector("#restart");

// Quiz States
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function quizStart() {
    // Hides Landing Page
    var landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");

    //Reveals Questions
    questionsEl.removeAttribute("class");

    // Timer Starts
    timerId = setInterval(clockTick, 1000);

    // Shows Time
    timerEl.textContent = timer;

    getQuestion();
}

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];

    var titleEl = document.getElementById("question-words")
    titleEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(function(choice, i) {
        // New Button for Options
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);
    
        choiceNode.textContent = i + 1 + ". " + choice;

        choiceNode.onclick = questionClick;

        choicesEl.appendChild(choiceNode);
    });
}

function questionClick() {
    // Check for Wrong Answer
    if (this.value !== questions[currentQuestionIndex].answer) {
      // Dock Time
      time -= 10;
  
      if (time < 0) {
        time = 0;
      }
      // Update Time
      timerEl.textContent = time;
      feedbackEl.textContent = "Wrong!";
      feedbackEl.style.color = "red";
      feedbackEl.style.fontSize = "200%";
    } else {
      feedbackEl.textContent = "Correct!";
      feedbackEl.style.color = "green";
      feedbackEl.style.fontSize = "200%";
    }
  
    // Give Correct or Wrong
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 1250);
  
    // next question
    currentQuestionIndex++;
  
    // time checker
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
}

function quizEnd() {
    // Stop Timer
    clearInterval(timerId);
  
    // Show Final Score
    var endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
  
    // show final score
    var finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = time;
  
    // hide questions section
    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    // Update the Timer
    time--;
    timerEl.textContent = time;
  
    // Is There Time Left?
    if (time <= 0) {
      quizEnd();
    }
}

function saveHighscore() {
    // Get Initials
    var initials = initialsEl.value.trim();
  
    if (initials !== "") {
      // Get Saved Score If There Are Scores
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
  
      // Format the New Score
      var newScore = {
        score: time,
        initials: initials
      };
  
      // Save to Localstorage
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
    }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}

// Submit Button Listener
submitBtn.onclick = saveHighscore;

// Start Listener
startBtn.onclick = quizStart;

initialsEl.onkeyup = checkForEnter;

