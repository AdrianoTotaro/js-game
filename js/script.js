var canvas = document.getElementById("myCanvas");
var score = 0;
var ctx = canvas.getContext("2d");

var ballX = 20, ballY = 20, ballRadius = 10, color = "black";
var velX = 2, velY = 2;
var paddleX = canvas.width/2 - 30, paddleY = canvas.height - 30, paddle_lenght = 60, paddle_height = 10;
var pressedLeft = false, pressedRight = false;


addEventListener("keydown", keydown, false);
addEventListener("keyup", keyup, false);

function keydown(event) {
    if(event.key == "ArrowLeft")
        pressedLeft = true;
    if(event.key == "ArrowRight")
        pressedRight = true;
}

function keyup(event) {
    if(event.key == "ArrowLeft")
        pressedLeft = false;
    if(event.key == "ArrowRight")
        pressedRight = false;
}

function drawBall(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2*Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function movement(){
    ballX += velX;
    ballY += velY;

    if(pressedRight){
        if(paddleX +paddle_lenght < canvas.width)
            paddleX += 5;
    }
    else if(pressedLeft){
        if(paddleX > -5)
            paddleX -= 5;
    }
}

function collision(){
    
    if(ballY - ballRadius + velY <= 0 || ballY + ballRadius+velY >= canvas.height) 
        velY = -velY;
    if(ballX - ballRadius + velX <= 0 || ballX + ballRadius+velX >= canvas.width){
        velX = -velX;
        if(ballX - ballRadius < 0)
            ballX = ballRadius;
        if(ballX+ ballRadius > canvas.width)
            ballX = canvas.width - ballRadius
    }
    
    if(ballY+ballRadius +velY >= paddleY && ballY-ballRadius <= paddleY+paddle_height)
        if(ballX +ballRadius/2 >= paddleX && ballX <= paddleX + paddle_lenght + ballRadius){
                let  colors = ["black", "red", "blue", "green", "violet", "#40E0D0", "#000080"]
                velY = -velY;
                color = colors[Math.floor(Math.random() * colors.length)];
                score++;
                document.getElementById('score').innerHTML = "score = " + score;
        }
    
    if(ballY+ballRadius +velY > paddleY && ballY <= paddleY + paddle_height)
        if(ballX + ballRadius >= paddleX && ballX - ballRadius <= paddleX + paddle_lenght){
                if(ballX - paddleX  - paddle_lenght/2 <= 0){
                    ballX = paddleX - ballRadius;
                    ballY--;
                    velX = -velX;
                    velY = -velY;
                }
                else{
                    ballX = paddleX+ paddle_lenght+ballRadius;
                    ballY--;
                    velX = -velX;
                    velY = -velY;
                }
        }

    if(ballY + ballRadius + 2 >= canvas.height){
        alert("GAME OVER");
        location.reload();
    }

    
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddle_lenght, paddle_height);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath
}

function draw() {

    drawBall();
    drawPaddle();
    movement();
    collision();
   
}

var interval = setInterval(draw, 10);