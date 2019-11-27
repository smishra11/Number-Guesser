/*
GAME FUNCTION:
-Player must guess a number between 1 to 10.
-Player get a certain amount of guess.
-Notify player of remaining guess.
-Notify the player of correct answer if loose.
-Let player choose play again.
*/ 

//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Element
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');
      
// Asign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listner
game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

//Listen guess
guessBtn.addEventListener('click',function(){
    let guess = parseInt(guessInput.value);

    //Validate
    if(isNaN(guess)|| guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`,'red');
    }
    //Check if won
    if(guess === winningNum){
        //Game over -won
        gameOver(true, `${winningNum} is correct ,YOU WIN !`);
    }else {
        //wrong number
        guessesLeft -=1;

        if(guessesLeft === 0){
            //Game over lost
            gameOver(false,`Game over, You Lost. The correct number was ${winningNum}`);
        } else {
            //Game continues - answer wrong

            //Change border color
            guessInput.style.borderColor = 'red';

            //Clear input
            guessInput.value = '';
            //Tell user it's the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`,'red');
        }
    }
});

//Game over
function gameOver(won,msg){
    let color;
    won === true ? color = 'green' : color = 'red';

    //Disable input
    guessInput.disabled = true;
    //Change border color
    guessInput.style.borderColor = color;
    //Channge text color
    message.style.color = color;
    //Set message
    setMessage(msg);

    //Play Again ??
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

//Get winning Number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

//Set  message
function setMessage(msg,color){
    message.style.color = color;
    message.textContent = msg;
}