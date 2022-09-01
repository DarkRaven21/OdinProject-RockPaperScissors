//Making Random Number
let randomNumber;
randomNumber = getRandomNumber(1, 3);

//Math random gives me a number between 0 and 1
//I multiply that number between the gap from the max number and the min number. I add it 1 because the max number is included in the posibility
//I add that number to the min number, wich gives me exactly how close I am from the min or the max number
//Example: if a not add the +1 in step 2, Math.floor(Math.random()*(7 - 3) + 3) would give me a result between 3 and 6. - 0.99 * 3 + 3 = 6.96 and I want a result between 3 and 7

function getRandomNumber(min, max){
    return Math.floor(Math.random()*(max - min + 1) + min);
}

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

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return `You both played ${playerSelection}, it's a tie! better luck next time`;
    }
    else if (playerSelection === 'Rock' && computerSelection === 'Paper' || playerSelection === 'Paper' && computerSelection === 'Rock'|| playerSelection === 'Scissors' && computerSelection === 'Rock' ){
        return `You've won! ${playerSelection} beats ${computerSelection}. What an incredible play!`
    }
    else {
        return `You lose! ${computerSelection} beats ${playerSelection}. But don't worry. The compute always wins`
    }
}

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

//I dont like games to work from prompt. But i will do it because it's in the excersice

const playerPromptSelection = window.prompt('It\'s your turn to play, choose either Rock, Paper or Scissors');
const playerSelection = getCorrectSpelling(playerPromptSelection);

function getCorrectSpelling(string) {
    a = string.slice(0, 1);
    b = string.slice(1);
    return a.toUpperCase()+b.toLowerCase();
}

console.log(playerSelection);