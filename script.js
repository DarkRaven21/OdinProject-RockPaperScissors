//Making Random Number
let randomNumber;

//Math random gives me a number between 0 and 1
//I multiply that number between the gap from the max number and the min number. I add it 1 because the max number is included in the posibility
//I add that number to the min number, wich gives me exactly how close I am from the min or the max number
//Example: if a not add the +1 in step 2, Math.floor(Math.random()*(7 - 3) + 3) would give me a result between 3 and 6. - 0.99 * 3 + 3 = 6.96 and I want a result between 3 and 7

function getRandomNumber(min, max){
    return Math.floor(Math.random()*(max - min + 1) + min);
}

randomNumber = getRandomNumber(1, 3);

//Making computer selection. Based on the random number obtained above, I made the computer assign that number to a hand move

const computerSelection = getComputerChoice(randomNumber);


function getComputerChoice(randomNumber) {
    if (randomNumber === 1){
        return 'Rock';
    }
    else if (randomNumber === 2){
        return 'Paper';
    }
    else if (randomNumber === 3){
        return 'Scissors';
    }
    else {
        return 'Error'; //This is here just for testing
    }
}

let wins = 0; //Added wins and losses to keep score
let losses = 0;

function playRound(playerSelection, computerSelection) {
    if (playerSelection === 'Rock' ||playerSelection === 'Paper' ||playerSelection === 'Scissors') {

        if (playerSelection === computerSelection) {
            return `You both played ${playerSelection}, it's a tie! better luck next time`;
        }
        else if (playerSelection === 'Rock' && computerSelection === 'Scissors' || playerSelection === 'Paper' && computerSelection === 'Rock'|| playerSelection === 'Scissors' && computerSelection === 'Rock' ){
            wins++;
            return `You've won! ${playerSelection} beats ${computerSelection}. What an incredible play!`
        }
        else {
            losses++;
            return `You lose! ${computerSelection} beats ${playerSelection}. But don't worry. The computer always wins`
        }
    }

    else {
        losses++;
        return 'Error, the player must choose a valid hand movement'
    }
} //Added a double check so the function doesn't work with the wrong input






//I dont like games to work from prompt. But I will do it because it's in the excersice (I'll change all of this later)

const playerPromptSelection = window.prompt('It\'s your turn to play, choose either Rock, Paper or Scissors');
const playerSelection = getCorrectSpelling(playerPromptSelection);

function getCorrectSpelling(string) {
    a = string.slice(0, 1);
    b = string.slice(1);
    return a.toUpperCase()+b.toLowerCase();
}

console.log(playerSelection);

console.log(playRound(playerSelection, computerSelection));

//Making game() function

function game(){
    wins = 0;
    losses = 0

    for (let i = 0; i < 5; i++){
        playerMove = getCorrectSpelling(window.prompt('It\'s your turn to play, choose either Rock, Paper or Scissors'));
        computerMove = getComputerChoice(random = getRandomNumber(1, 3));
        console.log(playRound(playerMove, computerMove));        
    }

    if (wins > losses){
        return `I can't believe you have won! Congratulations`
    }
    else if (losses > wins){
        return 'You lose! I told you that the computer always wins'
    }
    else{
        return `It's a tie in the global! Amaizing effort. Keep going and you'll win someday`
    }
}

//Making a gameTo5() function

function gameTo5(){
    wins = 0;
    losses = 0;
    KeepGoing = true;

    while(KeepGoing){
        playerMove = getCorrectSpelling(window.prompt('It\'s your turn to play, choose either Rock, Paper or Scissors'));
        computerMove = getComputerChoice(random = getRandomNumber(1, 3));
        console.log(playRound(playerMove, computerMove));
        if (wins < 5 && losses < 5){
            KeepGoing;
        }
        else{
            if (wins === 5){
                KeepGoing = false;
                return `You Won!! You are a hero at this`
            }
            else {
                KeepGoing = false;
                return `You Lose! like I predicted`
            }
        }
    }
}





//While working on playRound

//I've made a function to give me only the positive result from the game and then I made them true. If its not true, then that means either you have tied or you have lost.
//Eventualy I decided to put all this logic directly in the playRound function for better readability

//function getWinFromGame(playerSelection, computerSelection){
//    if (playerSelection === 'Rock' && computerSelection === 'Paper' || playerSelection === 'Paper' && computerSelection === 'Rock'|| playerSelection === 'Scissors' && computerSelection === 'Rock' ){
//        return `You've won! What an incredible play!`
//    }
//    else {
//        return `You lose. But don't worry. The compute always wins`
//    }
//}