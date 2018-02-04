//VARIABLES
//Limit for guesses in a single round
var guessLimit = 12;

//Number of guesses remaining for round
var guessesRemaining;

//Array containing the possible answers
var wordList = ["John Mayer", "Eric Clapton", "Radio Head"];

//Array that keeps all wrong user guesses
var userWrongGuesses = [];

//Array that contains the correct user guesses from round 
var userCorrectGuesses = [];

//word Randomly Selected to be the answer
var solution = [];

//Testing functions (to be deleted)
newRound();


//Resets for a new round
function newRound() {
    roundReset();
    solution = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
    userCorrectGuesses.length = solution.length;
    fillArray(userCorrectGuesses);
};

//Fills the empty array with an underscore in place of letter and space in place of space
function fillArray(array) {
    for(var i = 0; i < array.length; i++) {
        if(solution[i] === " ") {
            array[i] = " ";
        } else {
            array[i] = "_";
        }
    };
};

//Logic when a letter is guessed by player
function guessLetter(guess) {   
    guess = guess.toLowerCase();
    console.log("User guess: " + guess);
    console.log("Solution: " + solution);
    console.log("Guesses Remaining: " + guessesRemaining);

    //Checking if letter has been typed before
    if(solution.indexOf(guess) != -1) {
        for(var i= 0; i < solution.length; i++) {
            if(guess === solution[i]) {
                userCorrectGuesses[i] = guess;
            }
        } 
    //If user picks a wrong letter that has not been chosen before
    } else if(userWrongGuesses.indexOf(guess) == -1) {
        userWrongGuesses.push(guess);
        guessesRemaining--;
    }

    console.log(userCorrectGuesses.toString());
    console.log("-----------------------");
};

//Resets the game for a new round
function roundReset() {
    guessesRemaining = guessLimit;
    userGuesses = [];

}

//When key is pressed, function runs
document.onkeyup = function(event) {
    if(letterCheck(event.key)) {
        guessLetter(event.key);
    }
    $("#hangman-board").text(userCorrectGuesses.join(""));
    $("#wrong-guesses").text(userWrongGuesses.join(""));
    $("#guesses-remaining").text(guessesRemaining);

};

//Check if input is letter (Not Working)
function letterCheck(input) {
    if((input.charCodeAt(0) >= 65 && input.charCodeAt(0) <= 90) || (input.charCodeAt(0) >= 97 && input.charCodeAt(0) <= 122)) {
        return true;
    } else {
        return false;
    }
};

$(document).ready(function() {
    $("#hangman-board").text(userCorrectGuesses.join(""));
    $("#wrong-guesses").text(userWrongGuesses.join(""));
    $("#guesses-remaining").text(guessesRemaining);


})