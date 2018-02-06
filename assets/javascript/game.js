//VARIABLES
//Limit for guesses in a single round
var guessLimit = 5;

//Number of guesses remaining for round
var guessesRemaining;

//Array containing the possible answers
var wordList = ["John Mayer", "Eric Clapton", "Radio Head", "The Beatles", "Allman Brothers", "Fleetwood Mac", "Stevie Wonder", "Steve Miller Band", "Drake", "Justin Beiber", "Mumford and Son", "Coldplay", "Elton John", "The Lumineers", "Lake Street Dive", "Demi Lovato", "Kendrick Lamar", "Migos", "Wiz Khalifa" ];

//Array that keeps all wrong user guesses
var userWrongGuesses = [];

//Array that contains the correct user guesses from round 
var userCorrectGuesses = [];

//Number of letters remaining to be solved in the solution
var solutionLettersRemaining;

//word Randomly Selected to be the answer
var solution = [];

//Lower limit of ASCII keyCode
var keyCodeMin = 65;

//Upper Limit of ASCII keyCode
var keyCodeMax = 122;

//Testing functions (to be deleted)


newRound();


//Resets for a new round
function newRound() {
    guessesRemaining = guessLimit;
    userGuesses = [];
    userWrongGuesses = [];
    userCorrectGuesses = [];
    solution = [];
    solution = wordList[Math.floor(Math.random() * wordList.length)].toLowerCase();
    userCorrectGuesses.length = solution.length;
    solutionLettersRemaining = getSolutionLength(solution);
    fillArray(userCorrectGuesses);
    console.log("Solution letters remaining: " + solutionLettersRemaining);
    $("#hangman-board").text(userCorrectGuesses.join(""));
    $("#wrong-guesses").text(userWrongGuesses.join(""));
    $("#guesses-remaining").text(guessesRemaining);
}

//Fills the empty array with an underscore in place of letter and space in place of space
function fillArray(array) {
    for(var i = 0; i < array.length; i++) {
        if(solution[i] === " ") {
            array[i] = " ";
        } else {
            array[i] = "_";
        }
    }
}

//Logic when a letter is guessed by player
function guessLetter(guess) {   
   
    //Checking if user has guesses remaining or has won the game
    if(guessesRemaining > 0 && solutionLettersRemaining > 0) {
        guess = guess.toLowerCase();
        console.log("User guess: " + guess);
        console.log("Solution: " + solution);
        console.log("Guesses Remaining: " + guessesRemaining);

        //Checking if letter has been typed before (not working)
        if(userCorrectGuesses.indexOf(guess) == -1){
            for(var i= 0; i < solution.length; i++) {
                if(guess === solution[i] ) {
                    userCorrectGuesses[i] = guess;
                    solutionLettersRemaining--;
                }
            } 
        }

        //If user picks a wrong letter that has not been chosen before
        if (userWrongGuesses.indexOf(guess) == -1 && solution.indexOf(guess) == -1) {
            userWrongGuesses.push(guess);
            guessesRemaining--;
        }

        if(guessesRemaining == 0) {
            console.log("You lost");
            $("#heading-alert").html('<div class="alert alert-danger">You Lost<button type="button" class="btn btn-default" id="play-again-button">Play Again?</button></div>');
        }
        if(solutionLettersRemaining == 0) {
            console.log("You won!!!!!!!");
            $("#heading-alert").html('<div class="alert alert-success">You won!<button type="button" class="btn btn-default" id="play-again-button">Play Again?</button></div>');
        }

        console.log(userCorrectGuesses.toString());
        console.log("Solution letters Remaining: " + solutionLettersRemaining);
        console.log("-----------------------");
    }
}

function getSolutionLength(array) {
    var length = 0;
    for(var i = 0; i < array.length; i++ ) {
        if(array[i] !== " ") {
            length ++;
        }
    }
    return length;
}


//Resets the game for a new round
function roundReset() {

    

}

//When key is pressed, function runs
document.onkeyup = function(event) {
    if(letterCheck(event)) {
        guessLetter(event.key);
    }
    $("#hangman-board").text(userCorrectGuesses.join(""));
    $("#wrong-guesses").text(userWrongGuesses.join(""));
    $("#guesses-remaining").text(guessesRemaining);
   
}

//Check if input is letter or symbol and not command keys
function letterCheck(input) {
    if(input.keyCode >= keyCodeMin && input.keyCode <= keyCodeMax){
        return true;
    } else {
        //console.log("keycode outside range");
        return false;
    }
}

$("#play-again-button").on("click", function() {
    newRound();
});

//Ready function 
$(document).ready(function() {
    $("#hangman-board").text(userCorrectGuesses.join(""));
    $("#wrong-guesses").text(userWrongGuesses.join(""));
    $("#guesses-remaining").text(guessesRemaining);
})