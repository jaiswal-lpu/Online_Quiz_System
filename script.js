// DOM Elements
const homeElement = document.getElementById('home');
const gameElement = document.getElementById('game');
const endElement = document.getElementById('end');
const highscoresElement = document.getElementById('highscores');
const categoryContainer = document.getElementById('category-container');
const questionElement = document.getElementById('question');
const choiceElements = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterElement = document.getElementById('question-counter');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const loaderElement = document.getElementById('loader');
const finalScoreElement = document.getElementById('final-score');
const usernameElement = document.getElementById('username');
const saveScoreBtn = document.getElementById('save-score-btn');
const highscoresList = document.getElementById('highscores-list');

// Buttons
const playBtn = document.getElementById('play-btn');
const highscoresBtn = document.getElementById('highscores-btn');
const categoryBtns = Array.from(document.getElementsByClassName('category-btn'));
const playAgainBtn = document.getElementById('play-again-btn');
const goHomeBtn = document.getElementById('go-home-btn');
const goHomeFromScoresBtn = document.getElementById('go-home-from-scores-btn');

// Game variables
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
let timer;
let timeLeft = 60;
let selectedCategory = 0;
const MAX_QUESTIONS = 10;
const CORRECT_BONUS = 10;
const API_URL = 'https://opentdb.com/api.php';

// Event Listeners
playBtn.addEventListener('click', showCategories);
highscoresBtn.addEventListener('click', showHighscores);
categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedCategory = btn.dataset.category;
    startGame();
  });
});
playAgainBtn.addEventListener('click', () => {
  showCategories();
});
goHomeBtn.addEventListener('click', goHome);
goHomeFromScoresBtn.addEventListener('click', goHome);
usernameElement.addEventListener('input', () => {
  saveScoreBtn.disabled = !usernameElement.value;
});
saveScoreBtn.addEventListener('click', saveHighScore);

choiceElements.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset.number;

    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

// Functions
function showCategories() {
  homeElement.classList.remove('hide');
  gameElement.classList.add('hide');
  endElement.classList.add('hide');
  highscoresElement.classList.add('hide');
  playBtn.classList.add('hide');
  highscoresBtn.classList.add('hide');
  categoryContainer.classList.remove('hide');
}

function startGame() {
  homeElement.classList.add('hide');
  gameElement.classList.remove('hide');
  categoryContainer.classList.add('hide');

  questionCounter = 0;
  score = 0;
  scoreElement.innerText = score;
  timeLeft = 60;
  timerElement.innerText = timeLeft;

  loaderElement.classList.remove('hide');
  gameElement.classList.add('hide');

  fetchQuestions();
  startTimer();
}

function fetchQuestions() {
  fetch(`${API_URL}?amount=${MAX_QUESTIONS}&category=${selectedCategory}&type=multiple`)
    .then(res => res.json())
    .then(data => {
      questions = data.results.map(loadedQuestion => {
        const formattedQuestion = {
          question: decodeHTML(loadedQuestion.question)
        };

        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
        answerChoices.splice(
          formattedQuestion.answer - 1,
          0,
          loadedQuestion.correct_answer
        );

        answerChoices.forEach((choice, index) => {
          formattedQuestion['choice' + (index + 1)] = decodeHTML(choice);
        });

        return formattedQuestion;
      });

      availableQuestions = [...questions];
      loaderElement.classList.add('hide');
      gameElement.classList.remove('hide');
      getNewQuestion();
    })
    .catch(err => {
      console.error('Error fetching questions:', err);
      goHome();
      alert('Error loading questions. Please try again.');
    });
}

function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    clearInterval(timer);
    endGame();
    return;
  }

  questionCounter++;
  questionCounterElement.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  questionElement.innerText = currentQuestion.question;

  choiceElements.forEach(choice => {
    const number = choice.dataset.number;
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
}

function incrementScore(num) {
  score += num;
  scoreElement.innerText = score;
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerText = timeLeft;

    if (timeLeft <= 10) {
      timerElement.classList.add('warning');
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function endGame() {
  gameElement.classList.add('hide');
  endElement.classList.remove('hide');
  finalScoreElement.innerText = `Your Score: ${score}`;
}

function saveHighScore(e) {
  e.preventDefault();

  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  const newScore = {
    score: score,
    name: usernameElement.value,
    category: getCategoryName(selectedCategory)
  };

  highScores.push(newScore);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(10); // Keep only top 10

  localStorage.setItem('highScores', JSON.stringify(highScores));
  showHighscores();
}

function showHighscores() {
  homeElement.classList.add('hide');
  gameElement.classList.add('hide');
  endElement.classList.add('hide');
  highscoresElement.classList.remove('hide');

  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  highscoresList.innerHTML = highScores
    .map(score => {
      return `<li class="high-score">
                <span>${score.name}</span>
                <span>${score.score}</span>
                <span>${score.category || 'Unknown'}</span>
            </li>`;
    })
    .join('');
}

function goHome() {
  homeElement.classList.remove('hide');
  gameElement.classList.add('hide');
  endElement.classList.add('hide');
  highscoresElement.classList.add('hide');
  categoryContainer.classList.add('hide');
  playBtn.classList.remove('hide');
  highscoresBtn.classList.remove('hide');
  clearInterval(timer);
}

function getCategoryName(categoryId) {
  const categories = {
    9: 'General Knowledge',
    18: 'Computer Science',
    21: 'Sports',
    23: 'History',
    27: 'Animals'
  };
  return categories[categoryId] || 'Unknown';
}

// Helper function to decode HTML entities
function decodeHTML(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

// Initialize the app
goHome();
playBtn.addEventListener('click', startGame);
highscoresBtn.addEventListener('click', showHighscores);
playAgainBtn.addEventListener('click', startGame);
goHomeFromScoresBtn.addEventListener('click', goHome);
saveScoreBtn.addEventListener('click', saveHighScore);
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedCategory = button.dataset.category;
    startGame();
  });
});

// Theme switcher
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
}

toggleSwitch.addEventListener('change', switchTheme);

const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
  }
}
