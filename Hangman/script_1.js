const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModel = document.querySelector(".game-model");
const playAgainBtn = document.querySelector("button");

// Inintializing game variables
let currentWord , correctLetters, wrongGuessCount;
const maxGuesses = 6;





const resetGame = () => {
    // Ressetting all game variables and sUI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModel.classList.remove("show");

}








const getRandomWord = () => {

    //Selectiong a random word and hint from the wordList
    const { word, hint }= wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
    // wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
}







const gameOver = (isVictory) => {
    // After 600ms of game complete.. showing model with relevant details
    // or After game complete..... showing model with relevant details
    // setTimeout(() => {
        const modelText = isVictory ? `You found the word:` : `The correct word was:`;
        gameModel.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModel.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
        gameModel.querySelector("p").innerHTML = `${modelText} <b>${currentWord}</b>`;
        gameModel.classList.add("show");
    // }, 300); 
}










const initGame = (button, clickedLetter) => {

    // console.log(button,clickedLetter);
    
    if(currentWord.includes(clickedLetter)) {           //******Checking if clickedLetter is exist on the currentWord*****
        // console.log(clickedLetter, " is exist on the word");

        [...currentWord].forEach((letter, index) => {                  //*****showing all correctt letters on the word display******
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        }); 
    }
    else {
        // console.log(clickedLetter, " is not exist on the word");

        //***********If clicked letter does'nt exist then update the wrongGuessCount and hangman image******* */
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true;                  //*********To disable the button so that same button cannot be clicked again
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if(wrongGuessCount === maxGuesses) return gameOver(false);           // ************Calling gameOver function if any of these condition meets*************
    if(correctLetters.length === currentWord.length) return gameOver(true);

}














for (let i = 97; i <= 122; i++) {              //*************Creating keyboard buttons and adding event listeners
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));

    // console.log(String.fromCharCode(i));    
}


getRandomWord();

playAgainBtn.addEventListener("click", getRandomWord);    // *****To reset the code and generate a new random word linkage to button











//****************************    EXTRA CODE !!! THIS DOES NOT INVOLVE THE WORKING OF THE PROJECT     ****************************



// main method is to use "defer" keyword in the link tag.
// Alternative method to run html doc before js file.

// document.addEventListener("DOMContentLoaded", function () {

    
// });



