let board = document.getElementsByClassName("checkersB")[0]; 
let pieceUcode = '\u2659'; 
let blackpieceUcode = '\u265f'; 
 
let from; 
var WhiteBlack = "";
 
Array.from(board.children).forEach(function(cell) { 
  cell.onclick = function(elem) {  
    if ( (elem.target.innerHTML === pieceUcode) || (elem.target.innerHTML === blackpieceUcode) ) { 
        from = elem.target; 
        if (elem.target.innerHTML === pieceUcode) { WhiteBlack = "white" }
	else if (elem.target.innerHTML === blackpieceUcode) { WhiteBlack = "black" };
    } else if (from && canMove(from, elem.target)) { 
	if (WhiteBlack == "white") { elem.target.innerHTML = pieceUcode; }
	else if (WhiteBlack == "black") { elem.target.innerHTML = blackpieceUcode; };
        from.innerHTML = ''; 
        from = null; 
	WhiteBlack = "";
    } 
  } 
}); 
 
function canMove(from, to) { 
  let flag = Math.abs(from.dataset.row - to.dataset.row) === 1; 
  flag = flag && to.innerHTML !== pieceUcode && to.innerHTML !== blackpieceUcode; 
  flag = flag && to.className.indexOf('yellow') > -1; 
  return flag; 
}