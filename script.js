//Making Random Number

let randomNumber;

//Math random gives me a number between 0 and 1
//I multiply that number between the gap from the max number and the min number. I add it 1 because the max number is included in the posibility
//I add that number to the min number, wich gives me exactly how close I am from the min or the max number
//Example: if a not add the +1 in step 2, Math.floor(Math.random()*(7 - 3) + 3) would give me a result between 3 and 6. - 0.99 * 3 + 3 = 6.96 and I want a result between 3 and 7

function getRandomNumber(min, max){
    return Math.floor(Math.random()*(max - min + 1) + min);
}

//Making computer selection. Based on the random number obtained above, I made the computer assign that number to a hand move


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

// Selected all enemies and added a click event

let enemiesSelected = document.getElementsByClassName("enemy");
let roundOpponent = "none";

for (let i= 0; i < enemiesSelected.length; i++){
    enemiesSelected[i].addEventListener('click', () => {
        selectEnemy(enemiesSelected[i]);
    })
}

function selectEnemy(enemySelected){
    if (isGameOver){
        return
    }
    roundOpponent = enemySelected.id;
    hideEnemies();
    changeRulesText(enemySelected.id);
    showHand();
    score.textContent = `Wins: ${wins} - Losses ${losses}`
}

function hideEnemies(){
    if (roundOpponent != 'none'){
        for (let i= 0; i < enemiesSelected.length; i++){
                if (roundOpponent != enemiesSelected[i].id){
                    enemiesSelected[i].style.display = 'none'
                }
    }
    }
}

function showEnemies() {
    for (let i= 0; i < enemiesSelected.length; i++){
        enemiesSelected[i].style.display = 'initial'
    }
}

// Selected all buttons and added a click event

let buttonPressed = document.querySelectorAll('button');

for (let i= 0; i < buttonPressed.length; i++){
    buttonPressed[i].addEventListener('click', () => {
        computerMove = getComputerChoice(getRandomNumber(1, 3));
        playRound(buttonPressed[i].textContent, computerMove);
    });
}

function showHand(){
   let show = document.getElementById("moves")
//    show.style.visibility = 'visible'
    show.style.display = 'flex'
}

function hideHand(){
    let hide = document.getElementById("moves")
    hide.style.display = 'none'
}

function changeRulesText(name){
    rulesClass[0].textContent = `You have chosen ${name} to be your opponent` 
    rulesClass[1].textContent = `Winner will be he who wins a total of 7 games`
    rulesClass[2].textContent = `Best of lucks`

}

function playAgainRules(){
    rulesClass[0].textContent = `Congratulations! You've won a match against ${roundOpponent} and you've earn a total of ${totalPoints} points`
    rulesClass[1].textContent = `You can keep playing to get even more points. It's time to chose your next oponent`
    rulesClass[2].textContent = `Yes! you can chose ${roundOpponent} again`
}

function gameOver(){
    rulesClass[0].textContent = `Oh no! ${roundOpponent} was to much for you`
    rulesClass[1].textContent = `Your total Score is ${totalPoints}`
    rulesClass[2].textContent = `Check the scoreboard to see your placement`
    let battleDiv = document.getElementById('battleDiv')
    battleDiv.style.display = 'none'
}

function addScore(){
    getOpponentScore()
    btn = document.createElement('button');
    btn.textContent = 'Score'
    btn.classList.add('scoreButton')
    scoreDiv = document.getElementById('scoreDiv')
    scoreDiv.appendChild(btn)
    result.style.display = 'none'

    btn.addEventListener('click', showScore)
}

function showScore(){
    main = document.getElementById('main')
    main.style.display = 'none'

    score = document.getElementById('scoreBoard')
    score.style.display = 'block'
    playerName = prompt('Enter your name');
    emptyName = document.getElementById('playerName');

    if (playerName === null) {emptyName.textContent = 'You'}
    else {emptyName.textContent = playerName+':';}
    
    emptyPoints = document.getElementById('playerPoints')
    emptyPoints.textContent = totalPoints
    sortScore();
}

// Selected all p grabbing them by the id

let score = document.getElementById('score');
let myHand = document.getElementById('myHand');
let computerHand = document.getElementById('computerHand');
let result = document.getElementById('result');

//Selected divs
let rules = document.getElementById('rules');
let rulesClass = document.getElementsByClassName('rulesClass');

//Game Scripts
let wins = 0;
let losses = 0;
let totalPoints = 0;
let isGameOver = false;

function playRound(playerSelection, computerSelection) {
    if (wins >= 7) {
        wonGame()
    }
    else if (losses >= 7) {
        lossGame()
    }
    else
    if (playerSelection === 'Rock' ||playerSelection === 'Paper' ||playerSelection === 'Scissors') {    
        return getWinsAndLosses(playerSelection, computerSelection);
    }
    else {
        return console.log('Error, the player must choose a valid hand movement');
    }
}


function getWinsAndLosses(playerSelection, computerSelection){
    if (playerSelection === computerSelection) {
        myHand.textContent = `You've played ${playerSelection}`;
        computerHand.textContent = `${roundOpponent} has played ${computerSelection}`;
        return result.textContent = `You both played ${playerSelection}, it's a tie! better luck next time`;
    }
    else if (playerSelection === 'Rock' && computerSelection === 'Scissors' ||
             playerSelection === 'Paper' && computerSelection === 'Rock'||
             playerSelection === 'Scissors' && computerSelection === 'Paper'){               
        wins++;
        score.textContent = `Wins: ${wins} - Losses ${losses}`;
        myHand.textContent = `You've played ${playerSelection}`;
        computerHand.textContent = `${roundOpponent} has played ${computerSelection}`;
        if (wins >=7) {
            wonGame();
            result.textContent = `You've won! ${playerSelection} beats ${computerSelection}. ${roundOpponent} it's out!`
        }
        else {
            result.textContent = `You've won! ${playerSelection} beats ${computerSelection}. `+ shout(roundOpponent, true)
        }
        return
    }
    else {
        losses++;
        score.textContent = `Wins: ${wins} - Losses ${losses}`;
        myHand.textContent = `You've played ${playerSelection}`;
        computerHand.textContent = `${roundOpponent} has played ${computerSelection}`;
        
        if (losses >=7) {
            lossGame();
        }
        else {
            result.textContent = `You lose! ${computerSelection} beats ${playerSelection}. `+ shout(roundOpponent, false)
        }
        return
    }
}

function shout(opponent, isWin){
    if (isWin){
        shoutWins = ['What an incredible play!', 'What a play!', `${opponent} is in shock`, `${opponent} seems lost`, `${opponent} doesn't understand whats happening`]
        return shoutWins[getRandomNumber(0,4)]
    }
    else {
        shoutLosses = [`${opponent} is gotten you figured out!`, `${opponent} is enjoying this`, `${opponent} seems in the zone`, `Perfect excecution for ${opponent}`, `${opponent} is oozing with confidence`]
        return shoutLosses[getRandomNumber(0,4)]
    }
    
}



function wonGame(){
    console.log(`You've won`)
    totalPoints+= 150;
    hideHand();
    showEnemies();
    playAgainRules();
    wins = 0;
    losses = 0;
}

function lossGame(){
    console.log(`Game Over`)
    isGameOver = true;
    hideHand();
    gameOver();
    addScore();
    wins = 0;
    losses = 0;
}

function getOpponentScore(){
    let milton = document.getElementById('miltonRanking')
    let jen = document.getElementById('jenRanking')
    let jack = document.getElementById('jackRanking')

    milton.querySelector('.points').textContent = (getRandomNumber(4, 5) * 150)
    jen.querySelector('.points').textContent = (getRandomNumber(2, 3) * 150)
    jack.querySelector('.points').textContent = (getRandomNumber(1, 2) * 150)
}

function sortScore(){
    let list = document.getElementById('rankingList')
    let you = document.getElementById('playerRanking')
    let milton = document.getElementById('miltonRanking')
    let jen = document.getElementById('jenRanking')
    let jack = document.getElementById('jackRanking')


    if (totalPoints >= parseInt(milton.querySelector('.points').textContent)){
        let newYou = list.insertBefore(you, milton)
    }
    else if (totalPoints >= parseInt(jen.querySelector('.points').textContent)){
        let newYou = list.insertBefore(you, jen)
    }
    else if (totalPoints >= parseInt(jack.querySelector('.points').textContent)){
        let newYou = list.insertBefore(you, jack)
    }
    else {
        return
    }
}