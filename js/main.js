let inputDir = { x: 0, y: 0 };

let scoreBox=document.getElementById('score');
let hiScoreBox=document.getElementById("hiScoreBox");
let hiScoreVal;
let hiScore=localStorage.getItem('hiScore');

const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameOver.mp3');
const moveSound = new Audio('music/move.mp3');
const bgMusic = new Audio('music/music.mp3');
let score=0;
let speed = 12;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 }

// game function 
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    // if you touch yourself
    for(let index=1;index<snakeArr.length;index++)
    {
        if(snake[index].x===snake[0].x && snake[index].y===snake[0].y)
        {
            return true;
        }
    }

    if(snake[0].x>=35 || snake[0].x<=0 || snake[0].y>=35 || snake[0].y<=0 ){
        return true;
    }

    return false;
}

function gameEngine() {
    // part 1: updating the snake array and food
    
    if(isCollide(snakeArr)){
        gameOverSound.play();
        bgMusic.pause();
        inputDir={x:0,y:0}
        alert("Game Over! press any key to play again");
        snakeArr=[{x:13, y:15}];
        bgMusic.play();
        score=0;
    }

    // if food is consumed then increment the score and regenrate the food

    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x)
    {
        foodSound.play();
        score+=12;
        if(score>hiScoreVal)
        {
            hiScoreVal=score;
            localStorage.setItem("hiScore",JSON.stringify(hiScoreVal));
            hiScoreBox.innerHTML="High Score" + hiScoreVal;

        }
        scoreBox.innerHTML= "score:" + score;
        snakeArr.unshift({x: snakeArr[0].x+inputDir.x, y: snakeArr[0].y+inputDir.y});
        let a=2;
        let b=33;
        food={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }

    // moving the snake
    for(let i=snakeArr.length-2; i>=0;i--)
    {
        // const element=snakeArr[i];
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // part 2: render the snake and food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


// main logic

if(hiScore===null)
{
    hiScoreVal=0;
    localStorage.setItem("hiScore",JSON.stringify(hiScoreVal));
}
else{
    hiScoreVal=JSON.parse(hiScore);
    hiScoreBox.innerHTML="High Score : " + hiScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }  //start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            console.log("ArrayDown");
            inputDir.x=0;
            inputDir.y=1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
    }
});