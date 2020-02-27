





/* Pawn object */

function Pawn(player, type) {
    this.player = player;
    this.maxStep = 1;
    this.type = type || 'pawn';
}

Pawn.prototype.getPlayer = function() {
    return this.player;
}

Pawn.prototype.getMaxStep = function() {
    return this.maxStep;
}

Pawn.prototype.setMaxStep = function(maxStep) {
    this.maxStep = maxStep;
    return this;
}

Pawn.prototype.getType = function() {
    return this.type;
}

Pawn.prototype.setType = function(type) {
    this.type = type;
    return this;
}








/* Player object */

function Player(name) {
    this.name = name;
    this.pawnCnt = 0;
}

Player.prototype.getName = function() {
    return this.name;
}

Player.prototype.getPawnCnt = function() {
    return this.pawnCnt;
}

Player.prototype.increasePawnCount = function() {
    this.pawnCnt++;
    return this;
}

Player.prototype.decreasePawnCount = function() {
    this.pawnCnt--;
    return this;
}







/* Box object */

function Box(r, c) {
    this.r = r;
    this.c = c;
}

Box.prototype.getR = function() {
    return this.r;
}

Box.prototype.getC = function() {
    return this.c;
}








/* Checkers Object */

function Checkers(vPlyr1, vPlyr2, vTimePerMoveSec = 0, vIsAIPlay = 0) {
    this.plyr1 = vPlyr1;
    this.plyr2 = vPlyr2;
    this.currentPlayerTurn = plyr1;
    this.firstTurnPlayer = plyr1;
    this.boardSize = 8;
    this.maxPawnsPerPlayer = 12;
    this.board = {};

    this.lastOperationMsg = "";
    this.lastUserMsg = "";
    this.wasLastMove_TogglePlayer = 0;
    this.wasLastMove_PromotedPawn = 0;
    this.wasLastMove_EatPawn = 0;
    this.canPlayerSkipMove = 0;
    this.currentNoOfPawns_Player1 = 12;
    this.currentNoOfPawns_Player2 = 12;

    this.lastMovedPawn = null;
    this.lastMovedDestBox = null;

    this.totalStalemateMoves = 0;
    this.totalMoves_Player1 = 0;
    this.totalMoves_Player2 = 0;
    this.totalTimeUsed_Player1 = 0;
    this.totalTimeUsed_Player2 = 0;

    if (vTimePerMoveSec >= 0) {
    	this.isTimedGame = 1;
    	this.timePerMoveSec = vTimePerMoveSec;
    }

    this.isAIPlay = vIsAIPlay;
    this.isPowerfulKing = false;
}

Checkers.prototype.resetLastMessages = function() {
    this.setlastOperationMsg("");
    this.setlastUserMsg("");
};

Checkers.prototype.resetLastStatuses = function() {
    this.setwasLastMove_TogglePlayer(0);
    this.setwasLastMove_PromotedPawn(0);
    this.setwasLastMove_EatPawn(0);
    this.setlastMovedPawn(null);
    this.setlastMovedDestBox(null);
    this.setcanPlayerSkipMove(0);
};

Checkers.prototype.resetCounters = function() {
    this.setcurrentNoOfPawns_Player1(0);
    this.setcurrentNoOfPawns_Player2(0);
    this.settotalStalemateMoves(0);
    this.settotalMoves_Player1(0);
    this.settotalMoves_Player2(0);
    this.settotalTimeUsed_Player1(0);
    this.settotalTimeUsed_Player2(0);
};

Checkers.prototype.setisPowerfulKing = function(val) {
    this.isPowerfulKing = val;
};

Checkers.prototype.getisPowerfulKing = function() {
    return this.isPowerfulKing;
};

Checkers.prototype.getisTimedGame = function() {
    return this.isTimedGame;
};

Checkers.prototype.getisAIPlay = function() {
    return this.isAIPlay;
};

Checkers.prototype.gettimePerMoveSec = function() {
    return this.timePerMoveSec;
};

Checkers.prototype.getlastMovedDestBox = function() {
    return this.lastMovedDestBox;
};

Checkers.prototype.setlastMovedDestBox = function(obj) {
    this.lastMovedDestBox = obj;
};

Checkers.prototype.getlastMovedPawn = function() {
    return this.lastMovedPawn;
};

Checkers.prototype.setlastMovedPawn = function(obj) {
    this.lastMovedPawn = obj;
};

Checkers.prototype.gettotalTimeUsed_Player1 = function() {
    return this.totalTimeUsed_Player1;
};

Checkers.prototype.settotalTimeUsed_Player1 = function(val) {
    this.totalTimeUsed_Player1 = val;
};

Checkers.prototype.gettotalTimeUsed_Player2 = function() {
    return this.totalTimeUsed_Player2;
};

Checkers.prototype.settotalTimeUsed_Player2 = function(val) {
    this.totalTimeUsed_Player2 = val;
};

Checkers.prototype.gettotalStalemateMoves = function() {
    return this.totalStalemateMoves;
};

Checkers.prototype.settotalStalemateMoves = function(val) {
    this.totaltotalStalemateMoves = val;
};

Checkers.prototype.gettotalMoves_Player1 = function() {
    return this.totalMoves_Player1;
};

Checkers.prototype.settotalMoves_Player1 = function(val) {
    this.totalMoves_Player1 = val;
};

Checkers.prototype.gettotalMoves_Player2 = function() {
    return this.totalMoves_Player2;
};

Checkers.prototype.settotalMoves_Player2 = function(val) {
    this.totalMoves_Player2 = val;
};

Checkers.prototype.getcurrentNoOfPawns_Player1 = function() {
    return this.currentNoOfPawns_Player1;
};

Checkers.prototype.setcurrentNoOfPawns_Player1 = function(val) {
    this.currentNoOfPawns_Player1 = val;
};

Checkers.prototype.getcurrentNoOfPawns_Player2 = function() {
    return this.currentNoOfPawns_Player2;
};

Checkers.prototype.setcurrentNoOfPawns_Player2 = function(val) {
    this.currentNoOfPawns_Player2 = val;
};

Checkers.prototype.getcanPlayerSkipMove = function() {
    return this.canPlayerSkipMove;
};

Checkers.prototype.setcanPlayerSkipMove = function(val) {
	this.canPlayerSkipMove = val;
};

Checkers.prototype.getwasLastMove_EatPawn = function() {
    return this.wasLastMove_EatPawn;
};

Checkers.prototype.setwasLastMove_EatPawn = function(val) {
    this.wasLastMove_EatPawn = val;
};

Checkers.prototype.getwasLastMove_PromotedPawn = function() {
    return this.wasLastMove_PromotedPawn;
};

Checkers.prototype.setwasLastMove_PromotedPawn = function(val) {
    this.wasLastMove_PromotedPawn = val;
};

Checkers.prototype.getwasLastMove_TogglePlayer = function() {
    return this.wasLastMove_TogglePlayer;
};

Checkers.prototype.setwasLastMove_TogglePlayer = function(val) {
    this.wasLastMove_TogglePlayer = val;
};

Checkers.prototype.getlastUserMsg = function() {
    return this.lastUserMsg;
};

Checkers.prototype.setlastUserMsg = function(msg) {
    this.lastUserMsg = msg;
};

Checkers.prototype.getlastOperationMsg = function() {
    return this.lastOperationMsg;
};

Checkers.prototype.setlastOperationMsg = function(msg) {
    this.lastOperationMsg = msg;
};

Checkers.prototype.resetBoard = function() {
    this.board = {};
};

Checkers.prototype.getBoard = function() {
    return this.board;
};

Checkers.prototype.checkSetCanPlayerSkipMove = function() {
	this.canPlayerSkipMove = 1;
	//logic
	return true;
};

Checkers.prototype.skipMove = function(pawn, Box) {
	if (this.canPlayerSkipMove == 1) {
		this.togglePlayer();
		this.setcanPlayerSkipMove(0);

		this.setlastUserMsg("Turn of " + this.getCurrentPlayer().getName());
		this.setlastOperationMsg("Turn skipped");
		return true;
	}
	else {		
		return false;
	}	
}

Checkers.prototype.addPawn = function(pawn, Box) {
    if(!this.isBoxEmpty(Box)) {
        return false;
    }

    if(undefined === this.board[Box.getR()]) {
        this.board[Box.getR()] = {};
    }
    this.board[Box.getR()][Box.getC()] = pawn;

    pawn.getPlayer().increasePawnCount();

    return this;
};

Checkers.prototype.removePawn = function(Box) {
    var pawn = this.getPawnByBox(Box);
    if(!pawn) {
        return false;
    }
    pawn.getPlayer().decreasePawnCount();

    delete this.board[Box.getR()][Box.getC()];
    return this;
};

Checkers.prototype.togglePlayer = function() {
    this.setwasLastMove_TogglePlayer(0);
    this.currentPlayerTurn = (this.currentPlayerTurn == this.plyr1) ?
        this.plyr2 : this.plyr1;
    this.setwasLastMove_TogglePlayer(1);
};

Checkers.prototype.getPawnByBox = function(Box) {
    var board = this.getBoard();
    if(undefined === board[Box.getR()] || undefined === board[Box.getR()][Box.getC()]) {
        return false;
    }
    return board[Box.getR()][Box.getC()];
};

Checkers.prototype.isBoxEmpty = function(Box) {
    if(this.getPawnByBox(Box)) {
        return false;
    }

    return Box.getR() % 2 === Box.getC() % 2;
};

Checkers.prototype.getNonEmptyBoxesOnTrack = function(startBox, destBox) {
    var horizRange = 1;
    var vertRange = 1;
    if(startBox.getR() > destBox.getR()) {
        horizRange = -1;
    }
    if(startBox.getC() > destBox.getC()) {
        vertRange = -1;
    }

    var distance = Math.abs(startBox.getR() - destBox.getR());

    var BoxesWithPawns = [];
    var currBox;
    var pwn;
    for(var i = 0; i <= distance; i++) {
        currBox = new Box(
            startBox.getR() + (i * horizRange),
            startBox.getC() + (i * vertRange)
        );
        pwn = this.getPawnByBox(currBox);
        if(pwn) {
            BoxesWithPawns.push(currBox);
        }
    }
    return BoxesWithPawns;
};

Checkers.prototype.promotePawnToKing_IfApplicable = function(currBox) {
 
    var pawn = this.getPawnByBox(currBox);

	if(pawn.getType() !== 'king') {
    	this.setwasLastMove_PromotedPawn(0);

	    var rowForPromotion = 0;
	    if(this.firstTurnPlayer === pawn.getPlayer()) {
        	rowForPromotion = this.boardSize -1;
    	    }

	    if(rowForPromotion !== currBox.getR()) {
        	return false;
	    }
   
		if (this.isPowerfulKing)
			pawn.setMaxStep(this.boardSize);
   	 	pawn.setType('king');
	   	this.setwasLastMove_PromotedPawn(1);
    		PlaySoundWav("king");
    		return true;
	}

	return false;
}

Checkers.prototype.initialize = function(firstTurnPlayer) {
    this.resetBoard();

    this.resetLastStatuses();
    this.resetLastMessages();
    this.resetCounters();

    if(undefined !== firstTurnPlayer) {
        if(firstTurnPlayer !== this.plyr1 && firstTurnPlayer !== this.plyr2) {
            throw new Error('Wrong firstTurnPlayer provided');
        }
        this.currentPlayerTurn = firstTurnPlayer;
    } else {
            this.currentPlayerTurn = this.plyr1;
    }
    this.firstTurnPlayer = this.currentPlayerTurn;
    
    this.initializeAllPawns(this.plyr1);
    this.initializeAllPawns(this.plyr2);
}

Checkers.prototype.initializeAllPawns = function(plyr) {
    var pawnsPerRow = this.boardSize / 2;
    var rowsNeeded = this.maxPawnsPerPlayer / pawnsPerRow;

    if (plyr == plyr1) {
    	for(var row = 0; row < rowsNeeded; row++) {
		this.initializeAllPawns_AddPawnsToBox(this.plyr1, row);	
	}
    }
    else if (plyr == plyr2) {
    	for(var row = this.boardSize -1;
        	row > (this.boardSize -1 -rowsNeeded); row--) {
			this.initializeAllPawns_AddPawnsToBox(this.plyr2, row);
    	}
    }
}

Checkers.prototype.initializeAllPawns_AddPawnsToBox = function(plyr, r) {
    for(var col = 0; col < this.boardSize; col++) {
    	if(!this.isBoxEmpty(
        	new Box(r, col)
                )) {
                continue;
        }
        this.addPawn(
            new Pawn(plyr), new Box(r, col)
        );
    }
}

Checkers.prototype.getCurrentPlayer = function() {
    return this.currentPlayerTurn;
}

Checkers.prototype.isGameWon = function() {
    return this.plyr1.getPawnCnt() == 0 ||
        this.plyr2.getPawnCnt() == 0;
}

Checkers.prototype.isGameStalemate = function() {
    return this.plyr1.getPawnCnt() == 1 &&
        this.plyr2.getPawnCnt() == 1 && this.totalStalemateMoves >= 20;
}

function PlaySoundWav(soundObj) {
  var audio = new Audio(soundObj + '.wav');
  audio.play();
}

Checkers.prototype.isValidMove
    = function(currBox, destBox) {

    if(currBox.getC() == destBox.getC() &&
        currBox.getR() == destBox.getR()) {
	this.setlastOperationMsg("Not moving");
        return false;
    }

    var pawn = this.getPawnByBox(currBox);
    if(!pawn) {
	this.setlastOperationMsg("No piece");
        return false;
    }

    if(pawn.getPlayer() !== this.getCurrentPlayer()) {
       this.setlastOperationMsg("Not your piece"); 
       return false;
    }

    if(destBox.getR() < 0 ||
        destBox.getC() < 0 ||
        destBox.getR() > this.boardSize -1 ||
        destBox.getC() > this.boardSize -1) {
        this.setlastOperationMsg("Outside board"); 
        return false;
    }

    if(!this.isBoxEmpty(destBox)) {
        this.setlastOperationMsg("Box not available"); 
        return false;
    }

    if(pawn.getType() !== 'king') {
        if(pawn.getPlayer() == this.plyr1) {
            if(currBox.getR() > destBox.getR()) {
        	this.setlastOperationMsg("Can't move back"); 
                return false;
            }
        } else if(currBox.getR() < destBox.getR()) {
            this.setlastOperationMsg("Can't move back"); 
            return false;
        }
    }


    var horizSteps = Math.abs(
        destBox.getR() - currBox.getR()
    );
    var vertSteps = Math.abs(
        destBox.getC() - currBox.getC()
    );
    if(horizSteps !== vertSteps) {
        this.setlastOperationMsg("Wrong move"); 
        return false;
    }


    var BoxesWithPawns
        = this.getNonEmptyBoxesOnTrack(
            currBox, destBox
    );
    if (BoxesWithPawns.length > 2) {
        this.setlastOperationMsg("Can't move that far"); 
        return false;
    }

    var maxStepsAllowed = pawn.getMaxStep();
    if (BoxesWithPawns.length === 2) {
         //For 'eating' - allow 1 more step
         maxStepsAllowed = Math.min(
            this.boardSize, maxStepsAllowed+1
        );

        var temp_pwn;
        while(BoxesWithPawns.length) {
            temp_pwn = this.getPawnByBox(
                BoxesWithPawns.pop()
            );
            if(temp_pwn === pawn) {
                continue;
            } else {
                break;
            }
        }

        if(temp_pwn.getPlayer() === pawn.getPlayer()) {
            this.setlastOperationMsg("Can't eat own piece"); 
            return false;
        }
    }


    if(horizSteps > maxStepsAllowed ||
        vertSteps > maxStepsAllowed) {
        this.setlastOperationMsg("Can't move that far"); 
        return false;
    }


    if(this.canPlayerSkipMove) {
	if (pawn != this.lastMovedPawn) {
		this.setlastOperationMsg("Can skip turn"); 
		return false;
	}
    }

    this.setlastOperationMsg("Valid move");
    return true;
}

Checkers.prototype.move = function(currBox, destBox) {

    if(!this.isValidMove(currBox, destBox)) {
        return false;
    }

    this.resetLastStatuses();
    this.resetLastMessages();

    var temp_pwn = this.getNonEmptyBoxesOnTrack(
        currBox, destBox
    );
    var pawn = this.getPawnByBox(temp_pwn.shift());
    var eatenPawnBox = temp_pwn.shift();

    if(eatenPawnBox) {
        this.removePawn(eatenPawnBox);
	this.setwasLastMove_EatPawn(1);
	PlaySoundWav("eat");
    }

    this.addPawn(pawn, destBox);
    this.removePawn(currBox);
    
    this.setlastMovedPawn(pawn);
    this.setlastMovedDestBox(destBox);

    var kingFlag = false;
    kingFlag = this.promotePawnToKing_IfApplicable(destBox);

    if (this.getCurrentPlayer() == this.plyr1)
	this.totalMoves_Player1+= 1;
    else if (this.getCurrentPlayer() == this.plyr2)
	this.totalMoves_Player2+= 1;

    if (this.plyr1.getPawnCnt() == 1 && this.plyr2.getPawnCnt() == 1)
	this.totalStalemateMoves+= 1;

    if ( (kingFlag) || (this.getwasLastMove_EatPawn() != 1) ) {
    	this.togglePlayer();
	this.setlastUserMsg("Turn of " + this.getCurrentPlayer().getName());
    }
    else {
	var set = this.checkSetCanPlayerSkipMove();;
    	if (set)
		this.setlastUserMsg("Can skip turn");
    }

    this.setlastOperationMsg("Successful move");
    
    return true;
}







/* User Experience */

const message = document.querySelector("h2");
let myBoard = document.getElementsByClassName("checkersB")[0]; 
let pieceUcode_pawn = '\u26C0'; 
let blackpieceUcode_pawn = '\u26C2'; 
let pieceUcode_king = '\u2654'; 
let blackpieceUcode_king = '\u265A'; 
 
let from; 

var fromR;
var fromC;
var toR;
var toC;
var clickDestCellFlag = true;	//to manage additional move by the same pawn after eating
var PawnAutoSelected = false;	//to manage additional move by the same pawn after eating

var playerNoToStart = 1;
var flgPowerfulKing = false;

var plyr1;
var plyr2;

plyr1 = new Player('first');
plyr2 = new Player('second');

var checkers;

let skipMoveButton = document.getElementById("skipMove");
window.onload = init;
document.getElementById("btnPlayAgain").onclick = init;
document.getElementById("btnWhoStarts").onclick = toggleTurn;
document.getElementById("btnHowManyPlayers").onclick = toggleMode;
document.getElementById("btnKingPower").onclick = kingPower;


function init() {

	checkers = null;

	checkers = new Checkers(plyr1, plyr2);
	if (playerNoToStart == 2) {
		checkers.initialize(plyr2);
		message.textContent = "Message: Turn of second";
	}
	else {
		checkers.initialize(plyr1);
		message.textContent = "Message: Turn of first";
	}

	checkers.setisPowerfulKing(flgPowerfulKing);

	reDrawCheckers()

	clickDestCellFlag = true;
	PawnAutoSelected = false;

Array.from(myBoard.children).forEach(function(cell) { 

  cell.onclick = function(elem) { 

    if (!PawnAutoSelected)
    	resetCheckersColor();

    //message.textContent = "Message: ";

    var element;
    if (elem.target) { 
	element = elem.target;
    }
    else if (elem) {
	element = elem;
    }

    if (   ( (element.innerHTML === pieceUcode_pawn) || (element.innerHTML === blackpieceUcode_pawn) 
		|| (element.innerHTML === pieceUcode_king) || (element.innerHTML === blackpieceUcode_king) ) 
		 && (!PawnAutoSelected)  ) { 
        from = element; 
	fromR = getCellRC(cell, "Row");
	fromC = getCellRC(cell, "Column");

	setSelectedColorToBox(element, fromR, fromC);
    } 
    else {
	toR = getCellRC(cell, "Row");
	toC = getCellRC(cell, "Column");

	message.textContent = "Message: ";
    
	var moveRes = checkers.move(new Box(fromR, fromC), new Box(toR, toC));

	if (!moveRes) {
		message.textContent+= checkers.getlastOperationMsg() + "; ";
		PlaySoundWav("error");
	}

	message.textContent+= checkers.getlastUserMsg();

		if (from && moveRes) { 
			from = null; 
			reDrawCheckers();
			clickDestCellFlag = true;
			PawnAutoSelected = false;

			if (checkers.getcanPlayerSkipMove() == 1)
				skipMoveButton.style.display = "block";
			else
				skipMoveButton.style.display = "none";
    		} 
	}

	if ( (checkers.getcanPlayerSkipMove() == 1) && clickDestCellFlag )
	{
		if (checkers.getlastMovedDestBox())
		{
			fromR = checkers.getlastMovedDestBox().r;
			fromC = checkers.getlastMovedDestBox().c;
			clickDestCellFlag = false;
			clickCell(fromR, fromC);
			PawnAutoSelected = true;
		}
	}

  } 
}); 

}

function kingPower() {
	if ( (document.getElementById("btnKingPower").innerHTML) == "Normal King" ) {
		document.getElementById("btnKingPower").innerHTML = "Powerful King";
		flgPowerfulKing = true;
	}
	else if ( (document.getElementById("btnKingPower").innerHTML) == "Powerful King" ) {
		document.getElementById("btnKingPower").innerHTML = "Normal King";
		flgPowerfulKing = false;
	}
	init();
}

function toggleMode() {

	alert("Computer AI is not ready yet. Play two-player game for now");

}

function toggleTurn() {
	if ( (document.getElementById("btnWhoStarts").innerHTML) == "Player 1 Starts" ) {
		document.getElementById("btnWhoStarts").innerHTML = "Player 2 Starts";
		playerNoToStart = 2;
	}
	else if ( (document.getElementById("btnWhoStarts").innerHTML) == "Player 2 Starts" ) {
		document.getElementById("btnWhoStarts").innerHTML = "Player 1 Starts";
		playerNoToStart = 1;
	}
	init();
}

skipMoveButton.onclick = function(){
	checkers.skipMove();

	if (checkers.getcanPlayerSkipMove() == 1)
		skipMoveButton.style.display = "block";
	else
		skipMoveButton.style.display = "none";

	message.textContent = "Message: ";
	message.textContent+= checkers.getlastOperationMsg() + "; ";
	message.textContent+= checkers.getlastUserMsg();
 
	PawnAutoSelected = false;
	resetCheckersColor();
}

function clickCell(rw, co) {

	Array.from(myBoard.children).forEach(function(cell) { 

		var fR = getCellRC(cell, "Row");
		var fC = getCellRC(cell, "Column");

		if (rw == fR && co == fC) {
			var id = ""+rw+co+"";
			var e = document.getElementById(id);
			if (typeof e.onclick == "function") {
				fromR = rw;
				fromC = co;
    				cell.onclick(e);
			}
		}
	});

}

function setSelectedColorToBox(e, rw, co) {

	var brd = checkers.getBoard();
	if (brd) {
		if (brd[rw]) {
			var p = brd[rw][co];
			if (p) {
				if (p.getPlayer().getName() == checkers.getCurrentPlayer().getName()) {
					//e.style.backgroundColor = "lightgreen";
					e.setAttribute("class", "lightgreen");
				}
			}
		}
	}

}

function reDrawCheckers() {

	resetCheckersColor();

	Array.from(myBoard.children).forEach(function(c) { 

	c.innerHTML = '';

	var brd = checkers.getBoard();
	if (brd) {
		var row = getCellRC(c, "Row");
		var column = getCellRC(c, "Column");
		if (brd[row]) {
			var p = brd[row][column];
			if (p) {
				if (p.getPlayer().getName() == "first") {
					if (p.getType() == "king")
						c.innerHTML = pieceUcode_king;
					else
						c.innerHTML = pieceUcode_pawn;
				}
				else if (p.getPlayer().getName() == "second") {
					if (p.getType() == "king")
						c.innerHTML = blackpieceUcode_king;
					else
						c.innerHTML = blackpieceUcode_pawn;
				}
			}
		}
	}
	});
}

function resetCheckersColor() {
	var i =0;
	Array.from(myBoard.children).forEach(function(c) { 
	
		var row;
		row = ((i - (i % 8)) / 8);

		if ((row % 2) == 0) {
			if ((i % 2) == 0) {
				//c.style.backgroundColor = "#FFEB3B";
				c.setAttribute("class", "yellow");
			}
			else
				c.setAttribute("class", "red");
		}
		else if ((row % 2) == 1) {
			if ((i % 2) == 1) {
				//c.style.backgroundColor = "#FFEB3B";
				c.setAttribute("class", "yellow");
			}
			else
				c.setAttribute("class", "red");
		}

		i++;
	});
}

function getCellRC(cell, type) {
	var c;

	if (type == "Row") {c = cell.id.substring(0,1); c-=0; };
	if (type == "Column") {c = cell.id.substring(1,2); c-=0; };

	return c;
}