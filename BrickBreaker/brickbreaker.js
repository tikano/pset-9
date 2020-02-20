
window.onload = function(){

var start_flag = true;

PlaySoundWav("start1");	//game start

var complexity = 4;
var radioButtons = document.getElementsByName("complexity");
radioButtons[2].checked = true;

function PlaySoundWav(soundObj) {
  var audio = new Audio(soundObj + '.wav');
  audio.play();
}

function PlaySoundMp3(soundObj) {
  var audio = new Audio(soundObj + '.mp3');
  audio.play();
}

var canvas=document.getElementById("BBcanvas");
var ctx=canvas.getContext("2d");

var canvas2=document.getElementById("Headingcanvas");
var ctx2=canvas2.getContext("2d");

var canvas3=document.getElementById("Topcanvas");
var ctx3=canvas3.getContext("2d");

var canvas4=document.getElementById("Topcanvas2");
var ctx4=canvas4.getContext("2d");

document.getElementById("pause").style.display = "inline";
document.getElementById("pause").onclick = function(){
	pausedFlag = true;
	var beforePause = new Date().getTime();
	fnAlert("GAME PAUSED!");
	var afterPause = new Date().getTime();
	pausedTime+= afterPause - beforePause;
	pausedFlag = false;
}

var pausedFlag = false;
var pausedTime = 0;
var x=canvas.width/2;
var y=canvas.height-30;
var dx;
dx = 1;
var dy;
dy = -1;
var direction = 1;
var elapsed_Mins = 0;
var elapsed_Secs = 0;
var elapsed_MSecs = 0;
var ballSize=30/complexity;
var paddleH=10;
var paddleW=210/complexity;
var paddleX=(canvas.width-paddleW)/2;
var RKeyPressed=false;
var LKeyPressed=false;
var brickRCnt=5;
var brickColCnt=6;
var brickW=120;
var brickH=30;
var brickPadding=10;
var brickOffSetTop=5;
var brickOffSetLeft=30;
var score=0;
var lives=3;
var speed=0;
var speed_increment=1.2;
var speed_decrement=1.2;
var colors = ["#C1CAE8", "#FDBC08", "#8BFF06", "#EDFD08", "#08FDED", "#FD08D4"];
var scores = [1,2,3,4,5,6];
var special = ["+ Speed", "- Speed", "+ Life ", "- Life "]
var rComplexity = ["Baby", "Easy", "Medium", "Hard", "Pro", "Crazy", "Death"]
var totalPossibleScore = 0;
var minusLifeCount = 0;
var bricks=[];

for(let c=0;c<brickColCnt;c++)
{
	bricks[c]=[];
	for(let r=0;r<brickRCnt;r++)
	{
		var temp_score = scores[getRandomInt(6)];
		totalPossibleScore += temp_score;
		bricks[c][r]={x:0,y:0,status:1,color:colors[temp_score - 1], special1:"", special2:temp_score};
	}
}

for(let i = 0; i < 6; i++){
	do{
		var chosenbrick = bricks[getRandomInt(brickColCnt)][getRandomInt(brickRCnt)];
	}while(chosenbrick.special1 != "");
	chosenbrick.special1 = special[getRandomInt(4)];
	if(chosenbrick.special1 == special[3] && minusLifeCount < 2){
		minusLifeCount++;
	}
	else{
		chosenbrick.special1 = special[getRandomInt(3)];
	}
	chosenbrick.color = "#FF0000" 
	totalPossibleScore -= chosenbrick.special2;
	chosenbrick.special2 = 0;
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

function number_format(val, decimals)
{
    val = parseFloat(val);
    return val.toFixed(decimals);
}

function fnAlert(msg)
{
	if (lives <= 0) { lives = 0 }
	var livesScore = lives * 10;
	var roundScore = number_format((score * 100)/totalPossibleScore, 2);
	var totScore = number_format(((score * 100)/totalPossibleScore)+livesScore, 2);

	for(let i = 0; i < radioButtons.length; i++){
		if(radioButtons[i].checked == true){
			txtComplexity = rComplexity[i];
		}
	}

	var str0 = msg + "\n";
	var str1 = "\n Complexity:    " + txtComplexity
	var str2 = "\n Raw Score:     " + score + "/" + totalPossibleScore + " = " + roundScore + "/100";
	var str3 = "\n Lives left:        " + lives;
	var str4 = "\n Total Score:    " + totScore;
	var str5 = "\n Time elapsed: " + elapsed_Mins + " Mins, " + elapsed_Secs + " Secs, and " +  elapsed_MSecs + " MSecs ";
	
	alert(str0 + str1 + str2 + str3 + str4 + str5);
}

function display_c(start, tstart) {
	window.start = parseFloat(start);
        var refresh = 0;
        if(start == 0) {
        	mytime = window.setTimeout(display_ct,0,tstart);
        } else {
                mytime = window.setTimeout(display_ct,refresh,tstart);
               }
}

function display_ct(tstart) {

if (!pausedFlag)
{
	var minutes = 0;
	var secs = 0;
	var msecs = 0;

	var telapsed = new Date().getTime() - tstart - pausedTime;

        minutes = Math.floor((telapsed / 1000 / 60))
        secs = Math.floor((telapsed / 1000) - (minutes * 60))
  	msecs =  Math.floor((telapsed - (secs * 1000) - (minutes * 60 * 1000)))

	var str = minutes + " Mins, " + secs + " Secs, and " +  msecs + " MSecs ";

	elapsed_Mins = minutes;
	elapsed_Secs = secs;
	elapsed_MSecs = msecs;

	ctx2.clearRect(0,0,canvas2.width,canvas2.height);
	ctx2.font="15px Arial";	
	ctx2.fillStyle="#000000"
	ctx2.fillText("Elapsed Time: ",250,15);
	ctx2.font="16px Arial";
	ctx2.fillStyle="#0095DD"
	ctx2.fillText(str,350,15);

        window.start = window.start + 1;

        tt = display_c(window.start, tstart);
}
}

function fnSpeed(s)
{
	if (s == "I") { dy = dy*(((speed_increment-1) / 3)+1); dx = dx*(((speed_increment-1) / 3)+1); }
	else { dy = dy/speed_decrement; dx = dx/speed_decrement; }
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
				ctx.fillStyle = "#000000";
				ctx.textAlign = "center";
				ctx.font="15px Arial";
				if (bricks[c][r].special1 != "") {
					ctx.fillText(bricks[c][r].special1,brickX + brickW/2, brickY + brickH/2);
				}
			else {
				ctx.fillText(bricks[c][r].special2,brickX + brickW/2, brickY + brickH/2);
			}
			ctx.closePath();
			}
		}
	}
}

function keyDownHandler(e){
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
					PlaySoundWav("brick1");	//hitting a brick
					dy=-dy;
					b.status=0;
					var chosenbrick = bricks[c][r];
					if (chosenbrick.special1 == "+ Life ") { lives++; PlaySoundMp3("lifeMore1"); fnSpeed("D"); }
					
					if (chosenbrick.special1 == "- Life ") { lives--; fnSpeed("I"); }

					if (chosenbrick.special1 == "+ Speed") { fnSpeed("I"); }
					
					if (chosenbrick.special1 == "- Speed") { fnSpeed("D") }
										
					score+=chosenbrick.special2;
					if(totalPossibleScore==score)
					{
						PlaySoundWav("win1");	//winning
						window.setTimeout(function(){fnAlert("YOU WIN!"); document.location.reload();},300);
					}

				}
			}
		}
	}
}

function drawHeading()
{
	ctx3.font="40px Arial";
	ctx3.fillStyle="#000000";
	ctx3.fillText("Brick Breaker",300,30);
}

function drawSpeed()
{
	ctx4.font="16px Arial";
	ctx4.fillStyle="#0095DD";

	var posConst = 70;
	var pos = 0;
	for(var c=0;c<Math.ceil(speed/2.5);c++)
	{
		ctx4.beginPath();
		ctx4.rect(60+(10*(c+1)),1,10,200);
		pos = posConst + 10*(c+1);
		if (speed < 40)
			ctx4.fillStyle = "#8BFF06";
		else if (speed < 80)
			ctx4.fillStyle = "#0095DD";
		else
			ctx4.fillStyle = "#FF0000";
		ctx4.strokeStyle='rgba(0,0,0,0.5)';
		ctx4.fill();
		ctx4.stroke();
	}
	if (pos == 0) { pos = posConst; }
	ctx4.fillStyle = "#000000";
	ctx4.fillText("Speed:",8,15);
	ctx4.font="20px Arial";
	if (speed < 40)
		ctx4.fillStyle = "#8BFF06";
	else if (speed < 80)
		ctx4.fillStyle = "#0095DD";
	else
		ctx4.fillStyle = "#FF0000";
	ctx4.fillText(" "+speed,pos,15);	
	ctx4.closePath();
}

function drawScore()
{
	ctx3.font="16px Arial";
	ctx3.fillStyle="#000000";
	ctx3.fillText("Score:",8,20);
	ctx3.font="20px Arial";
	ctx3.fillStyle = "#0095DD";
	ctx3.fillText(" "+score+"/"+totalPossibleScore,70,20);
}

function drawLives()
{
	ctx3.font="16px Arial";
	ctx3.fillStyle="#000000";
	if(lives < 0){
		lives = 0;
	}
	ctx3.fillText("Lives:",canvas3.width-100,20);
	ctx3.font="20px Arial";
	ctx3.fillStyle = "#0095DD";
	ctx3.fillText(" "+lives,canvas3.width-100+62,20);
}

function draw()
{	
	//ctx2.clearRect(0,0,canvas2.width,canvas2.height);

	ctx3.clearRect(0,0,canvas3.width,canvas3.height);
	drawHeading();
	drawLives();
	drawScore();

	ctx4.clearRect(0,0,canvas4.width,canvas4.height);	
	drawSpeed();

	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();

	collisonDetection();

	if(y+dy < ballSize){
		dy=-dy;
	}
	else if(y+dy > canvas.height-ballSize)
	{

		if(x>paddleX && x<paddleX +paddleW)
		{
			dy = -dy;
			dx = dx/direction;
			dx = Math.abs(dx);
			PlaySoundWav("paddle1");	//hitting paddle
			var distance = (x - paddleX)/paddleW;
			direction = (distance - 0.5) * (speed_increment / 0.5);
			dx = dx * direction;
		}
		else{
			PlaySoundWav("lifeLess1");	//losing life
			lives=lives-1;
			if(lives <= 0)    
			{
				PlaySoundMp3("lose1");	//game over
				window.setTimeout(function(){fnAlert("GAME OVER!"); document.location.reload();},300);
			}
			else
			{
				dy=dy*-speed_increment*0.9;
				dx=dx*speed_increment*0.9;
			}
	    }
	}

	if((x+dx < ballSize|| (x+dx > canvas.width-ballSize)) ){
	PlaySoundWav("wall1");	//hitting sidewall
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

	var temp_y_speed = Math.ceil(Math.abs(complexity*10*dy));
	var temp_x_speed = Math.ceil(Math.abs(complexity*10*dx));
	var temp_speed = Math.ceil(Math.sqrt(temp_y_speed**2 + temp_x_speed**2)/Math.sqrt(2));
	if (speed != temp_speed) { 
		if ((!start_flag) && (lives > 0)) {
			PlaySoundMp3("speed1");	//speed increase
		}
	}
	speed = temp_speed; 	

start_flag = false;
}

draw();
document.getElementById("start").onclick = function(){
if(document.getElementById("start").textContent == "Reset"){
	document.location.reload();
}

document.getElementById("start").textContent = "Reset";
var tstart = new Date().getTime();
display_c(0,tstart);

for(let i = 0; i < radioButtons.length; i++){
	if(radioButtons[i].checked == true){
		complexity = radioButtons[i].value;
		speed_increment = speed_increment + (0.01 * complexity);
		speed_decrement = speed_decrement - (0.01 * complexity);
	}
	radioButtons[i].disabled = true;
}


ballSize=30/complexity;
paddleW=250/complexity;
setInterval(draw,10);

}

}