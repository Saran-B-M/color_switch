let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = 600;

var gY = 600;
var dist = 400;
var gravity = 1.2;
var a = 0, b = 0,i;
var temp, min = gY;
var frame = 0;
let red = 'red';
let blue = 'blue';
var obstacles = []; 
ctx.lineWidth = '30';
let flag;
let score = 0;
let hScore = localStorage.getItem('highScore');
let bgSound;




document.addEventListener('click', () => {
    bounceSound.play();
    gY -= 55;
     obstacles.forEach(o => {
            o.oY += 18;
    });
    
});

function startGame(){
    bounceSound = new sound_('sounds/jump.ogg', 5);
    gameOverSound = new sound('sounds/gameOver.wav');
    updateGame();
}

function updateGame(){
    for(i=0; i<obstacles.length; i++){
        if(gameOver(obstacles[i])){
            gameOverSound.play();
            alert('Game Over\nScore:' + String(score) + 
                '\nHigh Score: '+ String(highScore()));
            return;
        }
        }
    ctx.clearRect(0,0, canvas.width, canvas.height);
    showScore();
    drawObstacles();
    drawGamePiece();
    aniFrame = requestAnimationFrame(updateGame);
    
}

function obstacle(oY,red,blue){
    this.oY = oY;
    this.Rstart;
    this.Rend;

    this.drawObstacle = function(){
        ctx.beginPath();
        this.Rstart = a;
        this.Rend = a + Math.PI;
        arc1 = ctx.arc(300, this.oY, 100, this.Rstart, this.Rend);
        ctx.strokeStyle = red;
        ctx.stroke();
        ctx.closePath();
        
        ctx.beginPath();
        ctx.arc(300, this.oY, 100, Math.PI-b, 2*Math.PI -b);
        ctx.strokeStyle = blue;
        ctx.stroke();
        ctx.closePath();

}
}

function drawGamePiece(){
    ctx.beginPath();
    ctx.arc(300, gY, 10, 0, 2*Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();

    gY += gravity;
}

function drawObstacles(){
    if(!obstacles[0]) obstacles.push(new obstacle(300,red, blue));

    if (obstacles[(obstacles.length - 1)].oY > 300){
        obstacles.push(new obstacle(-100,red, blue));
        score += 100;
    }
    for(i=0; i<obstacles.length; i++){

        obstacles[i].drawObstacle();
       

    }
}

function gameOver(obstacle){
    flag = false;
    if(gY >= window.innerHeight){
        flag = true;
    }
    if(gY<=(obstacle.oY+110) && gY>=(obstacle.oY+90)){
        if(!(Math.sin(obstacle.Rstart)<0 && Math.cos(obstacle.Rend)<0 || Math.sin(obstacle.Rstart)>0 && Math.cos(obstacle.Rend)<0)){
            flag = true;
            }
        }
    if(gY>=(obstacle.oY-110) && gY<=(obstacle.oY-90)){
        if(!(Math.sin(obstacle.Rstart)>0 && Math.cos(obstacle.Rend)>0 || Math.sin(obstacle.Rstart)<0 && Math.cos(obstacle.Rend)>0)){
            flag = true;
            }
        }
    return flag;    
}
function showScore(){
    ctx.font = '30px consolas';
    ctx.fillStyle = 'green';
    ctx.fillText(score, 500, 50);
}
function highScore(){
    if(hScore == undefined){
        localStorage.setItem('highScore', 0);
    }
    else if(score>hScore){
        localStorage.setItem('highScore', String(score));
        hScore = localStorage.getItem('highScore');
    }
    return hScore;

}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
}
function sound_(src, maxStreams=1){
    this.streamNum = 0; 
    this.streams = [];
    for(i=0; i<maxStreams; i++){
        this.streams.push(new sound(src));
    }
    this.play = function(){
        this.streamNum = (this.streamNum+1)% maxStreams;
        this.streams[this.streamNum].play();
    }
}
setInterval(() => {
    a += 0.05;
    b -= 0.05;
}, 30)

startGame();







