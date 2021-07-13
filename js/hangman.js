/* Global Variables */
let randomWord,
    chosenLetters;



/* Helper Functions */
function lettersGenerator() {
  // Creating the game keyboard
  Array.from('abcdefghijklmnopqrstuvwxyz').forEach(char => {
    const key = document.createElement('span');
    key.appendChild(document.createTextNode(char));
    key.className = 'char-box';
    document.querySelector('.game-keyboard').appendChild(key);
  });

  // Creating a box for each character
  chosenLetters.forEach(character => {
    const spanElement = document.createElement('span');
    if (character === ' ') {spanElement.className = 'space'}
    document.querySelector('.word-guess').appendChild(spanElement);
  });  
}
function chooseWord() {
  const words = {
      programming: ['php', 'Javascript', 'go', 'scala', 'fortran', 'r', 'mysql', 'Python'],
      movies: ['Prestige', 'Inception', 'Parasite', 'Interstellar', 'Whiplash', 'Memento', 'Coco', 'Up'],
      celebrity: ['Albert Einstein', 'Hitchcock', 'Alexander', 'Cleopatra', 'Mahatma Ghandi'],
      country: ['Syria', 'Palestine', 'Yemen', 'Egypt', 'Bahrain', 'Qatar']
  };

  // Choosing a Category
  const categoryList = Object.keys(words),
        randomCategory = categoryList[Math.floor(Math.random() * categoryList.length)];
  document.querySelector('.game-info .category span').innerHTML = randomCategory;

  // Choosing the Word
  const wordList = words[randomCategory];
  randomWord = wordList[Math.floor(Math.random() * wordList.length)];
  chosenLetters = Array.from(randomWord.toLowerCase());
}

function rightAnswer(target) {
  // Show the character in his place
  chosenLetters.forEach((character, characterIndex) => {
    if (target.innerHTML == character) {
      document.querySelectorAll('.word-guess span').forEach((span, spanIndex) => {
        if (characterIndex === spanIndex) {
          span.innerHTML = character;
          span.className = 'guessed';
        }
      });
    }
  });

  // Check if all letters have been guessed
  if (document.querySelectorAll('.guessed').length === chosenLetters.length) {
    document.body.style.pointerEvents = 'none';
    setTimeout(() => swal('You Won', '', 'success'), 500);
  }
}
function wrongAnswer() {
  const attemptsElement = document.querySelector('.game-info .attempts span');
  let attempts = parseInt(attemptsElement.textContent);

  attempts --;
  attemptsElement.innerHTML = attempts;
  if (attempts===8) {document.querySelector('.hang .stand').style.display = 'block'}
  if (attempts===7) {document.querySelector('.hang .bars').style.display = 'block'}
  if (attempts===6) {document.querySelector('.hang .bars').children[0].style.display = 'block'}
  if (attempts===5) {document.querySelector('.hang .bars').children[1].style.display = 'block'}
  if (attempts===4) {document.querySelector('.hang .rope').style.display = 'block'}
  if (attempts===3) {document.querySelector('.man .head').style.display = 'block'}
  if (attempts===2) {document.querySelector('.man .body').style.display = 'block'}
  if (attempts===1) {document.querySelector('.man .arms').style.display = 'block'}
  if (attempts===0) {
    document.querySelector('.man .legs').style.display = 'block';
    document.body.style.pointerEvents = 'none';
    setTimeout(() => swal('Game Over', `The word was "${randomWord}".`, 'error'), 500);
  }  
}



/* Events to handle game actions */

// [1] Starting Game action
window.onload = () => {
  chooseWord();
  lettersGenerator();
};

// [2] Choosing a Character action
document.addEventListener('click', (e) => {
  if (e.target.className === 'char-box') {
    e.target.classList.add('clicked');
    chosenLetters.includes(e.target.innerHTML) ? rightAnswer(e.target) : wrongAnswer();
  }
});