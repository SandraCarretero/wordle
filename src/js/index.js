import { formElement } from './dom';
import { generateRandomWord, getUserWord, printWord } from './wordle-functions';

generateRandomWord();

formElement.addEventListener('submit', event => {
	event.preventDefault();
	getUserWord(event);
	printWord();
	event.target.reset();
});
