import { formElement, gameElement, popupElement } from "./dom";

const ALL_WORDS = [
  'perro',
  'gato',
  'portatil',
  'programa',
  'montaña',
  'playa',
  'silueta',
  'natural',
  'libro',
  'musica'
];

const letterColors = {
  correct: 'letter-correct',
  present: 'letter-present',
  incorrect: 'letter-incorrect'
};
const NUMBER_OF_TRIES = 5;

let userWord;
let secretWord;
let currentRow = 0;
let wordToReplaceLetters;
let haveYouWon = false;

const createGameTable = () => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < NUMBER_OF_TRIES; i++) {
    const newRow = document.createElement('div');
    newRow.classList.add('game__row');
    for (let j = 0; j < secretWord.length; j++) {
      const newLetterContainer = document.createElement('span');
      newLetterContainer.classList.add('letter');
      newRow.append(newLetterContainer);
    }
    fragment.append(newRow);
  }

  gameElement.append(fragment);
};

const generateRandomWord = () => {
  const random = Math.floor(Math.random() * ALL_WORDS.length);
  secretWord = ALL_WORDS[random];
  wordToReplaceLetters = secretWord;
  console.log(secretWord);
  createGameTable();
};

const changeCurrentRow = () => {
  currentRow++;
};

const replaceLetter = userLetter => {
  wordToReplaceLetters = wordToReplaceLetters.replace(userLetter, '-');
};

const paintLetters = (color, position) => {
  gameElement.children[currentRow].children[position].classList.add(color);
};

const checkPresentAndIncorrectLetters = () => {
  for (let i = 0; i < userWord.length; i++) {
    const userLetter = userWord[i];
    const secretLetter = secretWord[i];

    if (
      wordToReplaceLetters.includes(userLetter) &&
      userLetter !== secretLetter
    ) {
      replaceLetter(userLetter);
      paintLetters(letterColors.present, i);
    } else if (userLetter !== secretLetter) {
      paintLetters(letterColors.incorrect, i);
    }
  }
  changeCurrentRow();
};

const checkCorrectLetters = () => {
  wordToReplaceLetters = secretWord;

  for (let i = 0; i < userWord.length; i++) {
    const userLetter = userWord[i];
    const secretLetter = secretWord[i];
    if (userLetter === secretLetter) {
      replaceLetter(userLetter);
      paintLetters(letterColors.correct, i);
      console.log(wordToReplaceLetters);
    }
  }
  checkPresentAndIncorrectLetters();
};

const printAllCells = () => {
  for (let index = 0; index < userWord.length; index++) {
    paintLetters(letterColors.correct, index);
  }
};

const showPopup = message => {
  popupElement.textContent = message;
  popupElement.classList.add('pop-up--show');

  setTimeout(() => {
    popupElement.classList.remove('pop-up--show');
  }, 3000);
};

const checkWin = () => {
  haveYouWon = userWord === secretWord;

  if (haveYouWon) {
    console.log('WIN');
    printAllCells();
    showPopup('¡Felicidades!');
  } else {
    checkCorrectLetters();
  }
};

const checkLose = () => {
  if (currentRow === NUMBER_OF_TRIES && userWord !== secretWord) {
      showPopup(`Has alcanzado el límite de intentos. La palabra era: ${secretWord}`);
    }
}

const printWord = () => {
  if (userWord.length !== secretWord.length) {
    showPopup(`La palabra debe tener ${secretWord.length} letras`);
    return;
  }
  for (let i = 0; i < userWord.length; i++) {
    gameElement.children[currentRow].children[i].textContent =
      userWord[i].toUpperCase();
  }
  checkWin();
  checkLose()
};

generateRandomWord();

formElement.addEventListener('submit', event => {
  event.preventDefault();
  userWord = event.target.word.value;
  printWord();
  event.target.reset();
});