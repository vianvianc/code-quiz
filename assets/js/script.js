var govQuestions = [
  {
    title: "how many us congress members?",
    options: ["280", "535", "390", "490"],
    answer: "535",
  },
  {
    title: "how many branches of government?",
    options: ["3", "4", "5", "6"],
    answer: "3",
  },
  {
    title: "total voting house members?",
    options: ["440", "435", "285", "562"],
    answer: "435",
  },
  {
    title: "how many US senators?",
    options: ["80", "40", "120", "100"],
    answer: "100",
  },
  {
    title: "how many supreme justices?",
    options: ["6", "9", "13", "5"],
    answer: "9",
  },
];

var timer = document.querySelector(".timer");
var time = document.querySelector("#time");
var startScreen = document.querySelector("#start-screen");
var startButton = document.querySelector("#startButton");
var questions = document.querySelector("#questions");
var questionEl = document.querySelector("#question-element");
var options = document.querySelector("#options");
var endScreen = document.querySelector("#end-screen");
var scoreEl = document.querySelector("#score");
var submit = document.querySelector("#submit");
var scoresList = document.querySelector("#scoresList");

var seconds = 60;
var startIndex = 0;
var timerState;
var score = 0;
var storedScores = JSON.parse(localStorage.getItem("score")) || [];
console.log(storedScores);
//startIndex 0 for question 1, which shows govQuestions [0].title

//connects to start quiz function to start timer, and when time <= 0, fires quiz end function
function setTimeInterval() {
  //updates the seconds integer
  seconds--;
  time.textContent = seconds;
  if (seconds <= 0) {
    endQuiz();
    console.log("quiz is over");
  }
}

//start function
function startQuiz() {
  //setting class as hide, hides the start screen
  startScreen.setAttribute("class", "hide");
  //removes the display:none element in .hide class by removing class itself
  questions.removeAttribute("class");
  //countdown
  timerState = setInterval(setTimeInterval, 1000);
  time.textContent = seconds;

  next();
}

function next() {
  // govQuestions array assigned to local variable showQuestion
  var showQuestion = govQuestions[startIndex];

  questionEl.textContent = showQuestion.title;
  options.textContent = "";

  showQuestion.options.forEach(function (choice) {
    var choiceButton = document.createElement("button");
    choiceButton.setAttribute("value", choice);
    choiceButton.setAttribute("class", ".quizButton");
    choiceButton.textContent = choice;
    choiceButton.onclick = check;
    options.appendChild(choiceButton);
  });
}
function check() {
  if (this.value === govQuestions[startIndex].answer) {
    score += 1;
  }
  startIndex++;
  //when startIndex reachs length of govQuestion array endQuiz
  if (startIndex === govQuestions.length) {
    endQuiz();
  } else {
    next();
  }
}

function endQuiz() {
  //clears the timer
  clearInterval(timerState);
  //hides last question
  questions.setAttribute("class", "hide");
  //reveals the final screen
  endScreen.removeAttribute("class");

  var scores = {
    score,
  };
  storedScores.push(scores);
  localStorage.setItem("score", JSON.stringify(storedScores));

  scoreEl.textContent = score;
}

//quiz start button
startButton.addEventListener("click", function (event) {
  event.preventDefault();
  startQuiz();
});
