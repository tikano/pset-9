
window.onload = function(){

var complexity = 4;
var buttons = document.getElementsByName("complexity");
buttons[2].checked = true;

function PlaySound(soundObj) {
  var audio = new Audio(soundObj + '.wav');
  audio.play();
}

document.getElementById("start").onclick = function(){

var canvas=document.getElementById("BBcanvas");
var ctx=canvas.getContext("2d");

document.getElementById("BBcanvas").onclick = function(){
	alert("Paused");
}

document.getElementById("pause").style.display = "inline";
document.getElementById("pause").onclick = function(){
	alert("Paused");
}

if(document.getElementById("start").textContent == "Reset"){
	document.location.reload();
}

document.getElementById("start").textContent = "Reset";

for(let i = 0; i < buttons.length; i++){
	if(buttons[i].checked == true){
		complexity = buttons[i].value;
	}
	buttons[i].disabled = true;
}
console.log(complexity);

var x=canvas.width/2;
var y=canvas.height-30;
var dx;
dx = 1;
var dy;
dy = -1;

var ballSize=30/complexity;
var paddleH=10;
var paddleW=210/complexity;
var paddleX=(canvas.width-paddleW)/2;
var RKeyPressed=false;
var LKeyPressed=false;
var brickRCnt=5;
var brickColCnt=4;
var brickW=100;
var brickH=20;
var brickPadding=10;
var brickOffSetTop=30;
var brickOffSetLeft=30;
var score=0;
var lives=3;
var speed=-1;
var speed_increment=1.3;
var colors = ["#0095DD", "#0095DD", "#8BFF06", "#EDFD08", "#08FDED", "#FD08D4", "#FDBC08"];

var bricks=[];
for(let c=0;c<brickColCnt;c++)
{
	bricks[c]=[];
	for(let r=0;r<brickRCnt;r++)
	{
		bricks[c][r]={x:0,y:0,status:1,color:colors[getRandomInt(6) + 1]};
	}
}

document.addEventListener("keydown",keyDownHandler);
document.addEventListener("keyup",keyUpHandler);

document.addEventListener("mousemove",mouseMoveHandler);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function mouseMoveHandler(e)
{
	var relativeX = e.clientX-canvas.offsetLeft;
	if(relativeX>0+paddleW/2 && relativeX < canvas.width-paddleW/2)
	{
		paddleX= relativeX-paddleW/2;
	}
}
function drawBricks()
{
	for(let c=0;c<brickColCnt;c++)
	{
		for(let r=0;r<brickRCnt;r++)
		{
			if(bricks[c][r].status==1)
			{
			var brickX=(c*(brickW+brickPadding)+brickOffSetLeft);
			var brickY=(r*(brickH+brickPadding)+brickOffSetTop);
			bricks[c][r].x=brickX;
			bricks[c][r].y=brickY;
			
			ctx.beginPath();
			ctx.rect(brickX,brickY,brickW,brickH);
			ctx.fillStyle = bricks[c][r].color;
			ctx.strokeStyle='rgba(0,0,0,0.5)';
			ctx.fill();
			ctx.stroke();
			ctx.closePath();
			}

		}
	}
}
function keyDownHandler(e){
	ctx.fillText("D-Key:"+e.keyCode,100,20);
	if(e.keyCode==39)
	{
		RKeyPressed=true;
	}
	else if(e.keyCode==37)
	{
		LKeyPressed=true;
	}

}

function keyUpHandler(e){
	ctx.fillText("U-Key:"+e.keyCode,100,20);
	if(e.keyCode==39)
	{
		RKeyPressed=false;
	}
	else if(e.keyCode==37)
	{
		LKeyPressed=false;
	}

}

function drawBall()
{
	ctx.beginPath();
	ctx.arc(x,y,ballSize,0,Math.PI*2);
	ctx.fillStyle="#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle()
{
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-(paddleH),paddleW,paddleH);
	ctx.fillStyle="#0095DD";
	ctx.fill();
	ctx.closePath();
}
function collisonDetection()
{
	for(var c=0;c<brickColCnt;c++)
	{
		for(var r=0;r<brickRCnt;r++)
		{
			var b=bricks[c][r];
			if(b.status==1)
			{
				if(x>b.x && x< b.x+brickW && y>b.y && y< b.y+brickH )
				{
					PlaySound("beep1");	//hitting a brick
					dy=-dy;
					b.status=0;
					++score;
					if(brickColCnt*brickRCnt==score)
					{
						PlaySound("beep1");	//winning
						alert("YOU WIN");
						document.location.reload();
					}

				}
			}
		}
	}
}

function drawScore()
{
	ctx.font="16px Arial";
	ctx.fillStyle="#0095DD";
	ctx.fillText("Score:"+score,8,20);
	ctx.fillText("Speed:"+speed,100,20);
}

function drawLives()
{
	ctx.font="16px Arial";
	ctx.fillStyle="#0095DD";
	ctx.fillText("Lives:"+lives,canvas.width-65,20);
	ctx.fillText("Speed:"+speed,100,20);
}

function draw()
{	
	ctx.clearRect(0,0,canvas.width,canvas.height)
	drawBricks();
	drawLives();
	drawBall();
	drawPaddle();
	drawScore();
	collisonDetection();

	if(y+dy < ballSize){
		dy=-dy;
	}
	else if(y+dy > canvas.height-2*ballSize)
	{

		if(x>paddleX && x<paddleX +paddleW)
		{
			PlaySound("beep1");	//hitting paddle
			dy=-dy;
		}
		else{
			PlaySound("beep1");	//losing life
			lives=lives-1;
			if(!lives)    
			{
			PlaySound("beep1");	//game over
				alert("GAME OVER");
		    	document.location.reload();
			}
			else
			{
				dy=dy*-speed_increment;
				dx=dx*speed_increment;
			}
	    }
	}

	if((x+dx < ballSize|| (x+dx > canvas.width-ballSize)) ){
			dx=-dx;
	}
	if(RKeyPressed && paddleX <canvas.width-paddleW)
	{
		paddleX+=7;
	}
	else if(LKeyPressed && paddleX>0){
		paddleX-=7;
	}
	x += complexity*dx/2;
	y += complexity*dy/2;

	speed = Math.ceil(complexity*10*speed_increment**(3-lives));

}

setInterval(draw,10);
}

}