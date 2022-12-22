var govQuestions = [
  {
    title: "how many us congress members?",
    options: ["280", "535", "390", "490"],
    answer: "535",
  },
  {
    title: "how many branches  of government?",
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
var thanksEl = document.querySelector("#thanks");

var seconds = 60;
var startIndex = 0;
var timerState;
var score = 0;
var storedScore = JSON.parse(localStorage.getItem("score")) || [];
console.log(storedScore);

function countdown() {
  //seconds is declared above and set to 60... updates the seconds integer decrement down
  seconds--;
  //display that update by setting seconds to time variable which holds refernce for span with class of time
  time.textContent = seconds;
  //if seconds go to 0 time is up goes to endQuiz function otherwise return to end of startQuiz function
  if (seconds <= 0) {
    endQuiz();
  }
}

//start function
function startQuiz() {
  //setting class as hide, hides the start screen
  startScreen.setAttribute("class", "hide");
  //removes the display:none element in .hide class by removing class itself
  questions.removeAttribute("class");
  //timerState empty variable set to built in setInterval function takes two parameters-- function countdown and one second
  //js engine goes to countdown function here..
  timerState = setInterval(countdown, 1000);
  //   time.textContent = seconds;
  //back from countdown functiion on to next question next function
  next();
}

function next() {
  // govQuestions array with startindex=0 representing arrays 0 position
  // assigned to local variable showQuestion. this is how will iterate
  //tnhrough govquestions object
  var showQuestion = govQuestions[startIndex];
  // set this local variable assigned to the current gov question object with the
  //title attribute selected set that to the questionEl refernce variable and use the
  //.textContent property to set that value into the div question-element
  //this shows the current question
  questionEl.textContent = showQuestion.title;
  //the options reference variable are set to the the options id in html and their
  //text content is initialized as an empty string
  options.textContent = "";
  //loop through
  //the .options attribute on the showQuestion local variable is like govQuestions.options except
  //at its indexed poisition... so its calling all the possible answers and .forEach is looping through
  //then each time that loop runs we excute a callback function which takes a parameter of choice

  showQuestion.options.forEach(function (choice) {
    //make a locally scoped variable called choiceButton to create a dynamic button element
    var choiceButton = document.createElement("button");

    //value is the attribute ...passing data from array to button
    //value is how will do comparison
    //setAttribute takes two parameters... setting value to choice
    choiceButton.setAttribute("value", choice);
    //make the options array elements content visible on the button
    choiceButton.textContent = choice;

    //whenever createElement method is used it needs to be appended to the DOM or it wont be usable. Using .appendChild method onto the options attribute of the govQuestions object
    options.appendChild(choiceButton);
    //now set up event listener on this button to check if its the right button or not. Go to check function
    choiceButton.onclick = check;
  });
}
function check() {
  // this refers to choice above at the index position
  //then compare it to govQuestions answer (correct predefined in object) at same index (initialized by startIndex)
  if (this.value === govQuestions[startIndex].answer) {
    score += 1;
    //increment score by one if match
  }
  //   either way increment the startIndex so govQuestions keeps pace with loop
  startIndex++;
  //when startIndex reachs length of govQuestion array endQuiz
  if (startIndex === govQuestions.length) {
    endQuiz();
    //if not go to next question
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
  //local variable scores to hold score that got incremented previously
  var scores = {
    score,
  };
  //stored score is an empty array initially then it gets populated at end by the incremented value of score
  storedScore.push(scores);
  //localStorage object set name value pair
  localStorage.setItem("score", JSON.stringify(storedScore));
  //display score in score ID
  scoreEl.textContent = score;

  var thanks = document.createElement("li");
  thanks.textContent = "Thanks for playing";
  thanksEl.appendChild(thanks);
}

//quiz start button  JS engine begins here
//no page reload then to the startQuiz function
startButton.addEventListener("click", function (event) {
  event.preventDefault();
  startQuiz();
});
