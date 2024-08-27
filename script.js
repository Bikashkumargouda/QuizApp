const questions = [
  {
    question: "Which is largest animal in the world?",
    answers: [
      { Text: "Shark", correct: false },
      { Text: "Blue whale", correct: true },
      { Text: "Elephant", correct: false },
      { Text: "Giraffe", correct: false },
    ],
  },
  {
    question: "What is the capital of France?",
    answers: [
      { Text: "Paris", correct: true },
      { Text: "London", correct: false },
      { Text: "Berlin", correct: false },
      { Text: "USA", correct: false },
    ],
  },
  {
    question: "Who won the Nobel Prize in Literature in 2020?",
    answers: [
      { Text: "Jane Austen", correct: false },
      { Text: "William Shakespeare", correct: true },
      { Text: "George Orwell", correct: false },
      { Text: "Mark Twain", correct: false },
    ],
  },
  {
    question: "What is the name of the largest ocean in the world?",
    answers: [
      { Text: "Pacific Ocean", correct: true },
      { Text: "Atlantic Ocean", correct: false },
      { Text: "Indian Ocean", correct: false },
      { Text: "Arctic Ocean", correct: false },
    ],
  },
  {
    question: "Who is the current Prime Minister of Australia?",
    answers: [
      { Text: "Frank Sinatra", correct: false },
      { Text: "David Cameron", correct: true },
      { Text: "Lord Mayor Murdoch", correct: false },
      { Text: "George Osborne", correct: false },
    ],
  },
  {
    question:
      "Which famous British author wrote the novel 'Pride and Prejudice'?",
    answers: [
      { Text: "Jane Austen", correct: true },
      { Text: "Charles Dickens", correct: false },
      { Text: "George Orwell", correct: false },
      { Text: "Mark Twain", correct: false },
    ],
  },
  {
    question: "What is the name of the largest city in the world?",
    answers: [
      { Text: "Tokyo", correct: true },
      { Text: "Delhi", correct: false },
      { Text: "Moscow", correct: false },
      { Text: "Beijing", correct: false },
    ],
  },
];

const questionElements = document.getElementById("question");
const answerButton = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElements.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.Text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  if (isCorrect) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElements.innerHTML =
    "Quiz Completed! Your Score: " + score + "/" + questions.length;
  nextButton.innerHTML = "Restart";
  // nextButton.addEventListener("click", startQuiz);
  nextButton.style.display = "block";
  // questionElements.style.fontSize = "24px";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
