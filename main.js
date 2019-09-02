document.getElementById('start-btn').onclick = function() {
    document.getElementById('start-game').style.display = "none";
    document.getElementById('game').style.display = "block";
}
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");


const box = 32;



const ground = new Image();
ground.src = "img/bg.png";

const foodImg = new Image();
foodImg.src = "img/food.png";


let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";



let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};


let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}


let score = 0;
let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

function draw(){

    ctx.drawImage(ground,0,0);
    
  
      
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "black" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    if(snakeX == food.x && snakeY == food.y){ 
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    }else{
        snake.pop();
    }
    let count = document.getElementById('count');
    count.innerHTML = score;
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    
    if(snakeX < -32 || snakeX > cvs.width || snakeY < -32 || snakeY > cvs.height || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
        localStorage.setItem('score'+ score, score);
        document.getElementById('game-over').style.display = "block";
        document.getElementById('game').style.display = "none";

    }
    
    snake.unshift(newHead);
}

let game = setInterval(draw,100);
document.getElementById('end-btn').onclick = function() {
    window.location.reload();
}

for(var i=0, len=localStorage.length; i<len; i++) {
    var key = localStorage.key(i);
    var value = localStorage[key];
    let List = document.getElementById('score-list');
    List.insertAdjacentHTML("beforeEnd", [
        '<li class="score-list-item">' + value + '</li>',
      ].join(''));
}
if (document.getElementsByClassName('score-list-item').length > 0) {
    document.getElementById('clear-list').style.display = "block";
    document.getElementById('clear-list').addEventListener('click', function() {
    localStorage.clear();
    window.location.reload();
})
}




















