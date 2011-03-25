var whoseTurn = 'x'; // Start with X
var movesx = []; // Moves for x
var moveso = []; // Moves for o
var playerx;
var playero;

// Just a simple array of all of the potential winning moves
var winningMoves = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

// #winning 
function charlieSheen(){
	if(whoseTurn == 'x'){
		var check = movesx;
		var player = playerx;
	}else{
		var check = moveso;
		var player = playero;
	}
	if(movesx.length + moveso.length == 9){
		var deadlock = true;
	}
	//For loop for each potential winning move set
	for(i=0;i<winningMoves.length; i++){	
		var win = 0; // if this hits 3 then we have a winner
		//For loop for each move in the potential winning move set
		for(j=0;j<winningMoves[i].length;j++){
			if(check.indexOf(winningMoves[i][j]) != -1){
				win++;
			}
		}
		if(win == 3){
			alert('We got a winner... it is '+player+'!');
		}
		if(confirm('Play again?')){
			resetBoard();
			return true;
		}
	}
	if(deadlock == true){
		if(confirm('Deadlock!!! Start a new game?')){
			resetBoard();
			return true;
		}
	}
}

function displayTurn(){
	if(whoseTurn == 'x'){
		$('#turnDialog').text('It is '+playerx+'\'s Turn');
	}else{
		$('#turnDialog').text('It is '+playero+'\'s Turn!');		
	}
	return false;
}

function resetLast(){
	var last;
	if(whoseTurn == 'x'){
		last = moveso.pop();		// O went last
		$('#button'+last+'').removeClass('selectedo clicked');
		whoseTurn = 'o';
	}else{ 
		last = movesx.pop();		// X went last
		$('#button'+last).removeClass('selectedx clicked');
		whoseTurn = 'x';
	}
	
	if(movesx.length == 0 && moveso.length == 0){
		$('#resetLastMove').css('visibility', 'hidden');
	}
	displayTurn();
}

// Kind of cheating on the javascript here using jquery, but hey...we're just prototyping
$(document).ready(function(){
	$('#play').bind('click', function(){
		playerx = $('input[name="player_x"]').val();
		playero = $('input[name="player_o"]').val();
		if(playerx == ''){
			playerx = 'Player X';
		}
		if(playero == ''){
			playero = 'Player O';
		}
		$('#container').css('-webkit-transform','translate(-320px, 0px)');
		displayTurn();
	});
	$('#startOver').bind('touchstart', function(){
		resetBoard();
	});
	$('.button').bind('touchstart', function(){
		if($(this).hasClass('clicked') == true){
			return false;
		}else{
			$(this).addClass('clicked');	// make it unselectable
			button = $(this).attr('id');	// pull out which id it is
			button = button.replace('button', '');	// remove button from the id selector to get the num	
			// a little repetitve here, could probably be rewritten more consisely
			if(whoseTurn == 'x'){
				$(this).addClass('selectedx');	// put an x in there	
				movesx.push(+button);			// make it an int and add it to the list of x moves 
				nextTurn = 'o';				// changes turns
			}else{
				$(this).addClass('selectedo');
				moveso.push(+button); // (the plus is a trick to change it to an int)
				nextTurn = 'x';
			}
			$('#resetLastMove').css('visibility', 'visible');
			if(charlieSheen() == true){ // check to see if we're #winning
				return;
			}
			whoseTurn = nextTurn;
			displayTurn(); // switch turns
		}
	});
	$('#resetLastMove').bind('touchstart', function(){
		resetLast();
	});
});

function resetBoard(){
	movesx = []; 
	moveso = [];
	whoseTurn = 'x'; // Start with X
	displayTurn();
	$('.button').removeClass('clicked selectedx selectedo');
	$('#resetLastMove').css('visibility', 'hidden');
}