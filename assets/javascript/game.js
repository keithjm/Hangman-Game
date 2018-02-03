
//Limit for guesses in a single round
var guessLimit = 12;

//Array containing the possible answers
var wordList = ["John Mayer", "Eric Clapton", "Radio Head"];
var guessesRemaining;

//Array that keeps all user guesses
var userGuesses = [];

//Array that contains the correct user guesses from round 
var userCorrectGuesses = [];

//word Randomly Selected to be the answer
var solution = [];

var usertext = document.getElementById("game");

//Resets 
function newRound() {
    roundReset();
    solution = wordList[Math.floor(Math.random() * wordList.length)];
    userCorrectGuesses.length = solution.length;

};
newRound();
//Logic when a letter is guessed by player
function guessLetter(guess) {   
    guess = guess.toLowerCase();
    console.log("User guess: " + guess);
    console.log("Solution: " + solution);

    

    //Checking if letter has been typed before
    //Rewrite as for loop iterating over word to find equality of letters
    if(userCorrectGuesses.indexOf(guess) == -1) {
    //User guesses correctly
        if(solution.indexOf(guess) != -1) {
            guessesRemaining --;
            userGuesses.push(guess);
            userCorrectGuesses[solution.indexOf(guess)] = guess;
            
        //User guesses incorrectly
        } else if (wordList.indexOf(guess) == -1) {
            guessesRemaining --;
            userGuesses.push(guess);
            console.log(userCorrectGuesses);
        }
    }

    console.log(userCorrectGuesses.toString());

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
};

//Check if input is letter (Not Working)
function letterCheck(input) {
    if((input.charCodeAt(0) >= 65 && input.charCodeAt(0) <= 90) || (input.charCodeAt(0) >= 97 && input.charCodeAt(0) <= 122)) {
        return true;
    } else {
        return false;
    }
};


    


