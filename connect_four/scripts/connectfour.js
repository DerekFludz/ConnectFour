// 6 rows, 7 columns
// one giant div or a div for each column?
// click on circle or button beneath/above column?
// div classes (c0, r0, color)?
// each row and column a separate array?
// make diagonals into arrays?

// user lands on game
// boxes for entering player names with placeholders?
// button to start game
// checkWinner horiz, vert, diag
// switchTurn

// I think I want a container div > 7 column divs > button, 6 circle divs for each column

$(function() {

	var $gameBoard = $('.board-container');
	// console.log($gameBoard);

	// to check who's turn it is and correctly apply colors
	var turn = true;
	// count for tie condition
	var tieCount = 0;
	// counts for cumulative score
	var flyerWins = 0;
	var devilWins = 0;
	var chuck = false;
	var chuckCount = 0;
	// trying to sort out array winning conditions
	// var flyerArray = [];
	// var devilArray = [];

	// disabling play again (though it is hidden) until game has been finished
	$('.reset').prop('disabled', true);

	$('.chuck').prop('disabled', true);

// var matrix = [];
// 	for (var i=0; i < 7; i++) {
// 		matrix[i] = [];
// 		for (var j=0; j < 6; j++) {
// 			matrix[i][j] = undefined;
// 		}
// 	}

	// to store elements in array for potential help with win conditions
	var matrix = [];

	// loop to add containers
	for (var i=0; i < 7; i++) {
		// seven columns
		$columnDiv = $('<div>');
		$columnDiv.addClass('column');
		$gameBoard.append($columnDiv);
		// each column gets a button
		$newButton = $('<button>');
		$newButton.addClass('colbutton');
		$columnDiv.prepend($newButton);
		for (var j=0; j < 6; j++) {
			// each column gets six circles
			$circleDiv = $('<div>');
			$circleDiv.addClass('circle empty');
			$columnDiv.append($circleDiv);
			// trying to create matrix to check winning conditions
			matrix.push($circleDiv);
		}
	}

	// console.log(matrix);

	// for (var i=0; i < 3; i++) {
	// 	if (matrix[i].hasClass('flyers')) {
	// 		console.log('MATRIX WORKS');
	// 	}
	// }

	// setting some variables for click functions and winning condition checks
	var $columns = $('.column');
	var $circles = $('.circle');
	var $buttons = $('.colbutton');
	var $firstEmpty = $('.empty:last');
	var $scoreBox = $('.score');

	// adding scoreboard to header
	$flyerScore = $('<h3>');
	$flyerScore.text('FLYERS: ' + flyerWins);
	$flyerScore.addClass('flyerwins');
	$scoreBox.append($flyerScore);

	$devilScore = $('<h3>');
	$devilScore.text('DEVILS: ' + devilWins);
	$devilScore.addClass('devilwins');
	$scoreBox.append($devilScore);

	$rules = $('<h4>');
	$rules.text('Flyers go First');
	$scoreBox.append($rules);

	// setting a counter for button clicks
	$buttons.data('count', 0);

	// clicking buttons will result in first empty circle filled with color of player turn
	$buttons.click(function() {
		if (turn == true) {
			$(this).siblings('.empty:last').addClass('flyers');
			$(this).siblings('.empty:last').removeClass('empty');
			// checks winning conditions on click
			checkWinner();
			// switches turn
			turn = false;
			// keeping track of clicks for tie mechanic
			tieCount ++;
			// chuck norris as player 2 logic
			if (chuck == true) {
				$(this).siblings('.empty:last').addClass('norris');
				$(this).siblings('.empty:last').removeClass('empty');
				turn = true;
				chuckCount ++;
				checkWinner();
			}
		} else if (turn == false) {
				$(this).siblings('.empty:last').addClass('devils');
				$(this).siblings('.empty:last').removeClass('empty');
				checkWinner();
				turn = true;
				tieCount ++;
		}
		// disable button once it has been clicked 6 times so that the turn cannot keep switching
		$(this).data().count++;
		if ($(this).data('count') == 6) {
			$(this).prop('disabled', true);
		}
	})

	// checking about pulling individual circles
	// console.log($circles.eq(0));
	// console.log($circles.eq(5));
	// console.log($circles.eq(41));

	// starting shamelessly with hard coded values
	// managed to trim down verbose hard code to simpler statements for two of the checks at least

	var winner;

	var checkVert = function() {
		// if ((($circles.eq(0).hasClass('flyers')) && ($circles.eq(1).hasClass('flyers')) && ($circles.eq(2).hasClass('flyers')) && ($circles.eq(3).hasClass('flyers')))
		// || (($circles.eq(1).hasClass('flyers')) && ($circles.eq(2).hasClass('flyers')) && ($circles.eq(3).hasClass('flyers')) && ($circles.eq(4).hasClass('flyers')))
		// || (($circles.eq(2).hasClass('flyers')) && ($circles.eq(3).hasClass('flyers')) && ($circles.eq(4).hasClass('flyers')) && ($circles.eq(5).hasClass('flyers')))
		// || (($circles.eq(6).hasClass('flyers')) && ($circles.eq(7).hasClass('flyers')) && ($circles.eq(8).hasClass('flyers')) && ($circles.eq(9).hasClass('flyers')))
		// || (($circles.eq(7).hasClass('flyers')) && ($circles.eq(8).hasClass('flyers')) && ($circles.eq(9).hasClass('flyers')) && ($circles.eq(10).hasClass('flyers')))
		// || (($circles.eq(8).hasClass('flyers')) && ($circles.eq(9).hasClass('flyers')) && ($circles.eq(10).hasClass('flyers')) && ($circles.eq(11).hasClass('flyers')))
		// || (($circles.eq(12).hasClass('flyers')) && ($circles.eq(13).hasClass('flyers')) && ($circles.eq(14).hasClass('flyers')) && ($circles.eq(15).hasClass('flyers')))
		// || (($circles.eq(13).hasClass('flyers')) && ($circles.eq(14).hasClass('flyers')) && ($circles.eq(15).hasClass('flyers')) && ($circles.eq(16).hasClass('flyers')))
		// || (($circles.eq(14).hasClass('flyers')) && ($circles.eq(15).hasClass('flyers')) && ($circles.eq(16).hasClass('flyers')) && ($circles.eq(17).hasClass('flyers')))
		// || (($circles.eq(18).hasClass('flyers')) && ($circles.eq(19).hasClass('flyers')) && ($circles.eq(20).hasClass('flyers')) && ($circles.eq(21).hasClass('flyers')))
		// || (($circles.eq(19).hasClass('flyers')) && ($circles.eq(20).hasClass('flyers')) && ($circles.eq(21).hasClass('flyers')) && ($circles.eq(22).hasClass('flyers')))
		// || (($circles.eq(20).hasClass('flyers')) && ($circles.eq(21).hasClass('flyers')) && ($circles.eq(22).hasClass('flyers')) && ($circles.eq(23).hasClass('flyers')))
		// || (($circles.eq(24).hasClass('flyers')) && ($circles.eq(25).hasClass('flyers')) && ($circles.eq(26).hasClass('flyers')) && ($circles.eq(27).hasClass('flyers')))
		// || (($circles.eq(25).hasClass('flyers')) && ($circles.eq(26).hasClass('flyers')) && ($circles.eq(27).hasClass('flyers')) && ($circles.eq(28).hasClass('flyers')))
		// || (($circles.eq(26).hasClass('flyers')) && ($circles.eq(27).hasClass('flyers')) && ($circles.eq(28).hasClass('flyers')) && ($circles.eq(29).hasClass('flyers')))
		// || (($circles.eq(30).hasClass('flyers')) && ($circles.eq(31).hasClass('flyers')) && ($circles.eq(32).hasClass('flyers')) && ($circles.eq(33).hasClass('flyers')))
		// || (($circles.eq(31).hasClass('flyers')) && ($circles.eq(32).hasClass('flyers')) && ($circles.eq(33).hasClass('flyers')) && ($circles.eq(34).hasClass('flyers')))
		// || (($circles.eq(32).hasClass('flyers')) && ($circles.eq(33).hasClass('flyers')) && ($circles.eq(34).hasClass('flyers')) && ($circles.eq(35).hasClass('flyers')))
		// || (($circles.eq(36).hasClass('flyers')) && ($circles.eq(37).hasClass('flyers')) && ($circles.eq(38).hasClass('flyers')) && ($circles.eq(39).hasClass('flyers')))
		// || (($circles.eq(37).hasClass('flyers')) && ($circles.eq(38).hasClass('flyers')) && ($circles.eq(39).hasClass('flyers')) && ($circles.eq(40).hasClass('flyers')))
		// || (($circles.eq(38).hasClass('flyers')) && ($circles.eq(39).hasClass('flyers')) && ($circles.eq(40).hasClass('flyers')) && ($circles.eq(41).hasClass('flyers')))) {
		// 	return winner = 'flyers';
		// } else if ((($circles.eq(0).hasClass('devils')) && ($circles.eq(1).hasClass('devils')) && ($circles.eq(2).hasClass('devils')) && ($circles.eq(3).hasClass('devils')))
		// || (($circles.eq(1).hasClass('devils')) && ($circles.eq(2).hasClass('devils')) && ($circles.eq(3).hasClass('devils')) && ($circles.eq(4).hasClass('devils')))
		// || (($circles.eq(2).hasClass('devils')) && ($circles.eq(3).hasClass('devils')) && ($circles.eq(4).hasClass('devils')) && ($circles.eq(5).hasClass('devils')))
		// || (($circles.eq(6).hasClass('devils')) && ($circles.eq(7).hasClass('devils')) && ($circles.eq(8).hasClass('devils')) && ($circles.eq(9).hasClass('devils')))
		// || (($circles.eq(7).hasClass('devils')) && ($circles.eq(8).hasClass('devils')) && ($circles.eq(9).hasClass('devils')) && ($circles.eq(10).hasClass('devils')))
		// || (($circles.eq(8).hasClass('devils')) && ($circles.eq(9).hasClass('devils')) && ($circles.eq(10).hasClass('devils')) && ($circles.eq(11).hasClass('devils')))
		// || (($circles.eq(12).hasClass('devils')) && ($circles.eq(13).hasClass('devils')) && ($circles.eq(14).hasClass('devils')) && ($circles.eq(15).hasClass('devils')))
		// || (($circles.eq(13).hasClass('devils')) && ($circles.eq(14).hasClass('devils')) && ($circles.eq(15).hasClass('devils')) && ($circles.eq(16).hasClass('devils')))
		// || (($circles.eq(14).hasClass('devils')) && ($circles.eq(15).hasClass('devils')) && ($circles.eq(16).hasClass('devils')) && ($circles.eq(17).hasClass('devils')))
		// || (($circles.eq(18).hasClass('devils')) && ($circles.eq(19).hasClass('devils')) && ($circles.eq(20).hasClass('devils')) && ($circles.eq(21).hasClass('devils')))
		// || (($circles.eq(19).hasClass('devils')) && ($circles.eq(20).hasClass('devils')) && ($circles.eq(21).hasClass('devils')) && ($circles.eq(22).hasClass('devils')))
		// || (($circles.eq(20).hasClass('devils')) && ($circles.eq(21).hasClass('devils')) && ($circles.eq(22).hasClass('devils')) && ($circles.eq(23).hasClass('devils')))
		// || (($circles.eq(24).hasClass('devils')) && ($circles.eq(25).hasClass('devils')) && ($circles.eq(26).hasClass('devils')) && ($circles.eq(27).hasClass('devils')))
		// || (($circles.eq(25).hasClass('devils')) && ($circles.eq(26).hasClass('devils')) && ($circles.eq(27).hasClass('devils')) && ($circles.eq(28).hasClass('devils')))
		// || (($circles.eq(26).hasClass('devils')) && ($circles.eq(27).hasClass('devils')) && ($circles.eq(28).hasClass('devils')) && ($circles.eq(29).hasClass('devils')))
		// || (($circles.eq(30).hasClass('devils')) && ($circles.eq(31).hasClass('devils')) && ($circles.eq(32).hasClass('devils')) && ($circles.eq(33).hasClass('devils')))
		// || (($circles.eq(31).hasClass('devils')) && ($circles.eq(32).hasClass('devils')) && ($circles.eq(33).hasClass('devils')) && ($circles.eq(34).hasClass('devils')))
		// || (($circles.eq(32).hasClass('devils')) && ($circles.eq(33).hasClass('devils')) && ($circles.eq(34).hasClass('devils')) && ($circles.eq(35).hasClass('devils')))
		// || (($circles.eq(36).hasClass('devils')) && ($circles.eq(37).hasClass('devils')) && ($circles.eq(38).hasClass('devils')) && ($circles.eq(39).hasClass('devils')))
		// || (($circles.eq(37).hasClass('devils')) && ($circles.eq(38).hasClass('devils')) && ($circles.eq(39).hasClass('devils')) && ($circles.eq(40).hasClass('devils')))
		// || (($circles.eq(38).hasClass('devils')) && ($circles.eq(39).hasClass('devils')) && ($circles.eq(40).hasClass('devils')) && ($circles.eq(41).hasClass('devils')))) {
		// 	return winner = 'devils';
		// } else {
		// 	return;
		// }
		for (var i=0; i < 37; i = i+6) {
			// tried to use a nested loop, kept breaking browser
			// turns out the breaking was in the 3rd statement of the loop, i+6 vs i = i+6
			// will re-visit a potential nested loop here later
			// for (var j=i; j < 3; j++)
			if (matrix[i].hasClass('flyers') && matrix[i+1].hasClass('flyers') && matrix[i+2].hasClass('flyers') && matrix[i+3].hasClass('flyers')) {
				return winner = 'flyers';
			} else if (matrix[i+1].hasClass('flyers') && matrix[i+2].hasClass('flyers') && matrix[i+3].hasClass('flyers') && matrix[i+4].hasClass('flyers')) {
				return winner = 'flyers';
			} else if (matrix[i+2].hasClass('flyers') && matrix[i+3].hasClass('flyers') && matrix[i+4].hasClass('flyers') && matrix[i+5].hasClass('flyers')) {
				return winner = 'flyers';
			} else if (matrix[i].hasClass('devils') && matrix[i+1].hasClass('devils') && matrix[i+2].hasClass('devils') && matrix[i+3].hasClass('devils')) {
				return winner = 'devils';
			} else if (matrix[i+1].hasClass('devils') && matrix[i+2].hasClass('devils') && matrix[i+3].hasClass('devils') && matrix[i+4].hasClass('devils')) {
				return winner = 'devils';
			} else if (matrix[i+2].hasClass('devils') && matrix[i+3].hasClass('devils') && matrix[i+4].hasClass('devils') && matrix[i+5].hasClass('devils')) {
				return winner = 'devils';
			}
		}
	}

	// used this to see why function was breaking, was using = where i meant to use ==
	// var checkVert = function() {
	// 	if ($circles.eq(4).hasClass('flyers')) {
	// 		console.log('boogie');
	// 	}
	// }

	var checkHorz = function() {
		// if ((($circles.eq(0).hasClass('flyers')) && ($circles.eq(6).hasClass('flyers')) && ($circles.eq(12).hasClass('flyers')) && ($circles.eq(18).hasClass('flyers')))
		// || (($circles.eq(1).hasClass('flyers')) && ($circles.eq(7).hasClass('flyers')) && ($circles.eq(13).hasClass('flyers')) && ($circles.eq(19).hasClass('flyers')))
		// || (($circles.eq(2).hasClass('flyers')) && ($circles.eq(8).hasClass('flyers')) && ($circles.eq(14).hasClass('flyers')) && ($circles.eq(20).hasClass('flyers')))
		// || (($circles.eq(3).hasClass('flyers')) && ($circles.eq(9).hasClass('flyers')) && ($circles.eq(15).hasClass('flyers')) && ($circles.eq(21).hasClass('flyers')))
		// || (($circles.eq(4).hasClass('flyers')) && ($circles.eq(10).hasClass('flyers')) && ($circles.eq(16).hasClass('flyers')) && ($circles.eq(22).hasClass('flyers')))
		// || (($circles.eq(5).hasClass('flyers')) && ($circles.eq(11).hasClass('flyers')) && ($circles.eq(17).hasClass('flyers')) && ($circles.eq(23).hasClass('flyers')))
		// || (($circles.eq(6).hasClass('flyers')) && ($circles.eq(12).hasClass('flyers')) && ($circles.eq(18).hasClass('flyers')) && ($circles.eq(24).hasClass('flyers')))
		// || (($circles.eq(7).hasClass('flyers')) && ($circles.eq(13).hasClass('flyers')) && ($circles.eq(19).hasClass('flyers')) && ($circles.eq(25).hasClass('flyers')))
		// || (($circles.eq(8).hasClass('flyers')) && ($circles.eq(14).hasClass('flyers')) && ($circles.eq(20).hasClass('flyers')) && ($circles.eq(26).hasClass('flyers')))
		// || (($circles.eq(9).hasClass('flyers')) && ($circles.eq(15).hasClass('flyers')) && ($circles.eq(21).hasClass('flyers')) && ($circles.eq(27).hasClass('flyers')))
		// || (($circles.eq(10).hasClass('flyers')) && ($circles.eq(16).hasClass('flyers')) && ($circles.eq(22).hasClass('flyers')) && ($circles.eq(28).hasClass('flyers')))
		// || (($circles.eq(11).hasClass('flyers')) && ($circles.eq(17).hasClass('flyers')) && ($circles.eq(23).hasClass('flyers')) && ($circles.eq(29).hasClass('flyers')))
		// || (($circles.eq(12).hasClass('flyers')) && ($circles.eq(18).hasClass('flyers')) && ($circles.eq(24).hasClass('flyers')) && ($circles.eq(30).hasClass('flyers')))
		// || (($circles.eq(13).hasClass('flyers')) && ($circles.eq(19).hasClass('flyers')) && ($circles.eq(25).hasClass('flyers')) && ($circles.eq(31).hasClass('flyers')))
		// || (($circles.eq(14).hasClass('flyers')) && ($circles.eq(20).hasClass('flyers')) && ($circles.eq(26).hasClass('flyers')) && ($circles.eq(32).hasClass('flyers')))
		// || (($circles.eq(15).hasClass('flyers')) && ($circles.eq(21).hasClass('flyers')) && ($circles.eq(27).hasClass('flyers')) && ($circles.eq(33).hasClass('flyers')))
		// || (($circles.eq(16).hasClass('flyers')) && ($circles.eq(22).hasClass('flyers')) && ($circles.eq(28).hasClass('flyers')) && ($circles.eq(34).hasClass('flyers')))
		// || (($circles.eq(17).hasClass('flyers')) && ($circles.eq(23).hasClass('flyers')) && ($circles.eq(29).hasClass('flyers')) && ($circles.eq(35).hasClass('flyers')))
		// || (($circles.eq(18).hasClass('flyers')) && ($circles.eq(24).hasClass('flyers')) && ($circles.eq(30).hasClass('flyers')) && ($circles.eq(36).hasClass('flyers')))
		// || (($circles.eq(19).hasClass('flyers')) && ($circles.eq(25).hasClass('flyers')) && ($circles.eq(31).hasClass('flyers')) && ($circles.eq(37).hasClass('flyers')))
		// || (($circles.eq(20).hasClass('flyers')) && ($circles.eq(26).hasClass('flyers')) && ($circles.eq(32).hasClass('flyers')) && ($circles.eq(38).hasClass('flyers')))
		// || (($circles.eq(21).hasClass('flyers')) && ($circles.eq(27).hasClass('flyers')) && ($circles.eq(33).hasClass('flyers')) && ($circles.eq(39).hasClass('flyers')))
		// || (($circles.eq(22).hasClass('flyers')) && ($circles.eq(28).hasClass('flyers')) && ($circles.eq(34).hasClass('flyers')) && ($circles.eq(40).hasClass('flyers')))
		// || (($circles.eq(23).hasClass('flyers')) && ($circles.eq(29).hasClass('flyers')) && ($circles.eq(35).hasClass('flyers')) && ($circles.eq(41).hasClass('flyers')))) {
		// 	return winner = 'flyers';
		// } else if ((($circles.eq(0).hasClass('devils')) && ($circles.eq(6).hasClass('devils')) && ($circles.eq(12).hasClass('devils')) && ($circles.eq(18).hasClass('devils')))
		// || (($circles.eq(1).hasClass('devils')) && ($circles.eq(7).hasClass('devils')) && ($circles.eq(13).hasClass('devils')) && ($circles.eq(19).hasClass('devils')))
		// || (($circles.eq(2).hasClass('devils')) && ($circles.eq(8).hasClass('devils')) && ($circles.eq(14).hasClass('devils')) && ($circles.eq(20).hasClass('devils')))
		// || (($circles.eq(3).hasClass('devils')) && ($circles.eq(9).hasClass('devils')) && ($circles.eq(15).hasClass('devils')) && ($circles.eq(21).hasClass('devils')))
		// || (($circles.eq(4).hasClass('devils')) && ($circles.eq(10).hasClass('devils')) && ($circles.eq(16).hasClass('devils')) && ($circles.eq(22).hasClass('devils')))
		// || (($circles.eq(5).hasClass('devils')) && ($circles.eq(11).hasClass('devils')) && ($circles.eq(17).hasClass('devils')) && ($circles.eq(23).hasClass('devils')))
		// || (($circles.eq(6).hasClass('devils')) && ($circles.eq(12).hasClass('devils')) && ($circles.eq(18).hasClass('devils')) && ($circles.eq(24).hasClass('devils')))
		// || (($circles.eq(7).hasClass('devils')) && ($circles.eq(13).hasClass('devils')) && ($circles.eq(19).hasClass('devils')) && ($circles.eq(25).hasClass('devils')))
		// || (($circles.eq(8).hasClass('devils')) && ($circles.eq(14).hasClass('devils')) && ($circles.eq(20).hasClass('devils')) && ($circles.eq(26).hasClass('devils')))
		// || (($circles.eq(9).hasClass('devils')) && ($circles.eq(15).hasClass('devils')) && ($circles.eq(21).hasClass('devils')) && ($circles.eq(27).hasClass('devils')))
		// || (($circles.eq(10).hasClass('devils')) && ($circles.eq(16).hasClass('devils')) && ($circles.eq(22).hasClass('devils')) && ($circles.eq(28).hasClass('devils')))
		// || (($circles.eq(11).hasClass('devils')) && ($circles.eq(17).hasClass('devils')) && ($circles.eq(23).hasClass('devils')) && ($circles.eq(29).hasClass('devils')))
		// || (($circles.eq(12).hasClass('devils')) && ($circles.eq(18).hasClass('devils')) && ($circles.eq(24).hasClass('devils')) && ($circles.eq(30).hasClass('devils')))
		// || (($circles.eq(13).hasClass('devils')) && ($circles.eq(19).hasClass('devils')) && ($circles.eq(25).hasClass('devils')) && ($circles.eq(31).hasClass('devils')))
		// || (($circles.eq(14).hasClass('devils')) && ($circles.eq(20).hasClass('devils')) && ($circles.eq(26).hasClass('devils')) && ($circles.eq(32).hasClass('devils')))
		// || (($circles.eq(15).hasClass('devils')) && ($circles.eq(21).hasClass('devils')) && ($circles.eq(27).hasClass('devils')) && ($circles.eq(33).hasClass('devils')))
		// || (($circles.eq(16).hasClass('devils')) && ($circles.eq(22).hasClass('devils')) && ($circles.eq(28).hasClass('devils')) && ($circles.eq(34).hasClass('devils')))
		// || (($circles.eq(17).hasClass('devils')) && ($circles.eq(23).hasClass('devils')) && ($circles.eq(29).hasClass('devils')) && ($circles.eq(35).hasClass('devils')))
		// || (($circles.eq(18).hasClass('devils')) && ($circles.eq(24).hasClass('devils')) && ($circles.eq(30).hasClass('devils')) && ($circles.eq(36).hasClass('devils')))
		// || (($circles.eq(19).hasClass('devils')) && ($circles.eq(25).hasClass('devils')) && ($circles.eq(31).hasClass('devils')) && ($circles.eq(37).hasClass('devils')))
		// || (($circles.eq(20).hasClass('devils')) && ($circles.eq(26).hasClass('devils')) && ($circles.eq(32).hasClass('devils')) && ($circles.eq(38).hasClass('devils')))
		// || (($circles.eq(21).hasClass('devils')) && ($circles.eq(27).hasClass('devils')) && ($circles.eq(33).hasClass('devils')) && ($circles.eq(39).hasClass('devils')))
		// || (($circles.eq(22).hasClass('devils')) && ($circles.eq(28).hasClass('devils')) && ($circles.eq(34).hasClass('devils')) && ($circles.eq(40).hasClass('devils')))
		// || (($circles.eq(23).hasClass('devils')) && ($circles.eq(29).hasClass('devils')) && ($circles.eq(35).hasClass('devils')) && ($circles.eq(41).hasClass('devils')))) {
		// 	return winner = 'devils';
		// } else {
		// 	return;
		// }
		for (var i=0; i < 25; i++) {
			if (matrix[i].hasClass('flyers') && matrix[i+6].hasClass('flyers') && matrix[i+12].hasClass('flyers') && matrix[i+18].hasClass('flyers')) {
				return winner = 'flyers';
			} else if (matrix[i].hasClass('devils') && matrix[i+6].hasClass('devils') && matrix[i+12].hasClass('devils') && matrix[i+18].hasClass('devils')) {
				return winner = 'devils';
			}
		}
	}

	// ran through some ideas for diagonal win conditions and while some were technically shorter, didn't hit the nail
	// would start with something similar to horiz/vert checks
	var checkDiag = function() {
		if ((($circles.eq(0).hasClass('flyers')) && ($circles.eq(7).hasClass('flyers')) && ($circles.eq(14).hasClass('flyers')) && ($circles.eq(21).hasClass('flyers')))
		|| (($circles.eq(1).hasClass('flyers')) && ($circles.eq(8).hasClass('flyers')) && ($circles.eq(15).hasClass('flyers')) && ($circles.eq(22).hasClass('flyers')))
		|| (($circles.eq(2).hasClass('flyers')) && ($circles.eq(9).hasClass('flyers')) && ($circles.eq(16).hasClass('flyers')) && ($circles.eq(23).hasClass('flyers')))
		|| (($circles.eq(3).hasClass('flyers')) && ($circles.eq(8).hasClass('flyers')) && ($circles.eq(13).hasClass('flyers')) && ($circles.eq(18).hasClass('flyers')))
		|| (($circles.eq(4).hasClass('flyers')) && ($circles.eq(9).hasClass('flyers')) && ($circles.eq(14).hasClass('flyers')) && ($circles.eq(19).hasClass('flyers')))
		|| (($circles.eq(5).hasClass('flyers')) && ($circles.eq(10).hasClass('flyers')) && ($circles.eq(15).hasClass('flyers')) && ($circles.eq(20).hasClass('flyers')))
		|| (($circles.eq(6).hasClass('flyers')) && ($circles.eq(13).hasClass('flyers')) && ($circles.eq(20).hasClass('flyers')) && ($circles.eq(27).hasClass('flyers')))
		|| (($circles.eq(7).hasClass('flyers')) && ($circles.eq(14).hasClass('flyers')) && ($circles.eq(21).hasClass('flyers')) && ($circles.eq(28).hasClass('flyers')))
		|| (($circles.eq(8).hasClass('flyers')) && ($circles.eq(15).hasClass('flyers')) && ($circles.eq(22).hasClass('flyers')) && ($circles.eq(29).hasClass('flyers')))
		|| (($circles.eq(9).hasClass('flyers')) && ($circles.eq(14).hasClass('flyers')) && ($circles.eq(19).hasClass('flyers')) && ($circles.eq(24).hasClass('flyers')))
		|| (($circles.eq(10).hasClass('flyers')) && ($circles.eq(15).hasClass('flyers')) && ($circles.eq(20).hasClass('flyers')) && ($circles.eq(25).hasClass('flyers')))
		|| (($circles.eq(11).hasClass('flyers')) && ($circles.eq(16).hasClass('flyers')) && ($circles.eq(21).hasClass('flyers')) && ($circles.eq(26).hasClass('flyers')))
		|| (($circles.eq(12).hasClass('flyers')) && ($circles.eq(19).hasClass('flyers')) && ($circles.eq(26).hasClass('flyers')) && ($circles.eq(33).hasClass('flyers')))
		|| (($circles.eq(13).hasClass('flyers')) && ($circles.eq(20).hasClass('flyers')) && ($circles.eq(27).hasClass('flyers')) && ($circles.eq(34).hasClass('flyers')))
		|| (($circles.eq(14).hasClass('flyers')) && ($circles.eq(21).hasClass('flyers')) && ($circles.eq(28).hasClass('flyers')) && ($circles.eq(35).hasClass('flyers')))
		|| (($circles.eq(15).hasClass('flyers')) && ($circles.eq(20).hasClass('flyers')) && ($circles.eq(25).hasClass('flyers')) && ($circles.eq(30).hasClass('flyers')))
		|| (($circles.eq(16).hasClass('flyers')) && ($circles.eq(21).hasClass('flyers')) && ($circles.eq(26).hasClass('flyers')) && ($circles.eq(31).hasClass('flyers')))
		|| (($circles.eq(17).hasClass('flyers')) && ($circles.eq(22).hasClass('flyers')) && ($circles.eq(27).hasClass('flyers')) && ($circles.eq(32).hasClass('flyers')))
		|| (($circles.eq(18).hasClass('flyers')) && ($circles.eq(25).hasClass('flyers')) && ($circles.eq(32).hasClass('flyers')) && ($circles.eq(39).hasClass('flyers')))
		|| (($circles.eq(19).hasClass('flyers')) && ($circles.eq(26).hasClass('flyers')) && ($circles.eq(33).hasClass('flyers')) && ($circles.eq(40).hasClass('flyers')))
		|| (($circles.eq(20).hasClass('flyers')) && ($circles.eq(27).hasClass('flyers')) && ($circles.eq(34).hasClass('flyers')) && ($circles.eq(41).hasClass('flyers')))
		|| (($circles.eq(21).hasClass('flyers')) && ($circles.eq(26).hasClass('flyers')) && ($circles.eq(31).hasClass('flyers')) && ($circles.eq(36).hasClass('flyers')))
		|| (($circles.eq(22).hasClass('flyers')) && ($circles.eq(27).hasClass('flyers')) && ($circles.eq(32).hasClass('flyers')) && ($circles.eq(37).hasClass('flyers')))
		|| (($circles.eq(23).hasClass('flyers')) && ($circles.eq(28).hasClass('flyers')) && ($circles.eq(33).hasClass('flyers')) && ($circles.eq(38).hasClass('flyers')))) {
			return winner = 'flyers';
		} else if ((($circles.eq(0).hasClass('devils')) && ($circles.eq(7).hasClass('devils')) && ($circles.eq(14).hasClass('devils')) && ($circles.eq(21).hasClass('devils')))
		|| (($circles.eq(1).hasClass('devils')) && ($circles.eq(8).hasClass('devils')) && ($circles.eq(15).hasClass('devils')) && ($circles.eq(22).hasClass('devils')))
		|| (($circles.eq(2).hasClass('devils')) && ($circles.eq(9).hasClass('devils')) && ($circles.eq(16).hasClass('devils')) && ($circles.eq(23).hasClass('devils')))
		|| (($circles.eq(3).hasClass('devils')) && ($circles.eq(8).hasClass('devils')) && ($circles.eq(13).hasClass('devils')) && ($circles.eq(18).hasClass('devils')))
		|| (($circles.eq(4).hasClass('devils')) && ($circles.eq(9).hasClass('devils')) && ($circles.eq(14).hasClass('devils')) && ($circles.eq(19).hasClass('devils')))
		|| (($circles.eq(5).hasClass('devils')) && ($circles.eq(10).hasClass('devils')) && ($circles.eq(15).hasClass('devils')) && ($circles.eq(20).hasClass('devils')))
		|| (($circles.eq(6).hasClass('devils')) && ($circles.eq(13).hasClass('devils')) && ($circles.eq(20).hasClass('devils')) && ($circles.eq(27).hasClass('devils')))
		|| (($circles.eq(7).hasClass('devils')) && ($circles.eq(14).hasClass('devils')) && ($circles.eq(21).hasClass('devils')) && ($circles.eq(28).hasClass('devils')))
		|| (($circles.eq(8).hasClass('devils')) && ($circles.eq(15).hasClass('devils')) && ($circles.eq(22).hasClass('devils')) && ($circles.eq(29).hasClass('devils')))
		|| (($circles.eq(9).hasClass('devils')) && ($circles.eq(14).hasClass('devils')) && ($circles.eq(19).hasClass('devils')) && ($circles.eq(24).hasClass('devils')))
		|| (($circles.eq(10).hasClass('devils')) && ($circles.eq(15).hasClass('devils')) && ($circles.eq(20).hasClass('devils')) && ($circles.eq(25).hasClass('devils')))
		|| (($circles.eq(11).hasClass('devils')) && ($circles.eq(16).hasClass('devils')) && ($circles.eq(21).hasClass('devils')) && ($circles.eq(26).hasClass('devils')))
		|| (($circles.eq(12).hasClass('devils')) && ($circles.eq(19).hasClass('devils')) && ($circles.eq(26).hasClass('devils')) && ($circles.eq(33).hasClass('devils')))
		|| (($circles.eq(13).hasClass('devils')) && ($circles.eq(20).hasClass('devils')) && ($circles.eq(27).hasClass('devils')) && ($circles.eq(34).hasClass('devils')))
		|| (($circles.eq(14).hasClass('devils')) && ($circles.eq(21).hasClass('devils')) && ($circles.eq(28).hasClass('devils')) && ($circles.eq(35).hasClass('devils')))
		|| (($circles.eq(15).hasClass('devils')) && ($circles.eq(20).hasClass('devils')) && ($circles.eq(25).hasClass('devils')) && ($circles.eq(30).hasClass('devils')))
		|| (($circles.eq(16).hasClass('devils')) && ($circles.eq(21).hasClass('devils')) && ($circles.eq(26).hasClass('devils')) && ($circles.eq(31).hasClass('devils')))
		|| (($circles.eq(17).hasClass('devils')) && ($circles.eq(22).hasClass('devils')) && ($circles.eq(27).hasClass('devils')) && ($circles.eq(32).hasClass('devils')))
		|| (($circles.eq(18).hasClass('devils')) && ($circles.eq(25).hasClass('devils')) && ($circles.eq(32).hasClass('devils')) && ($circles.eq(39).hasClass('devils')))
		|| (($circles.eq(19).hasClass('devils')) && ($circles.eq(26).hasClass('devils')) && ($circles.eq(33).hasClass('devils')) && ($circles.eq(40).hasClass('devils')))
		|| (($circles.eq(20).hasClass('devils')) && ($circles.eq(27).hasClass('devils')) && ($circles.eq(34).hasClass('devils')) && ($circles.eq(41).hasClass('devils')))
		|| (($circles.eq(21).hasClass('devils')) && ($circles.eq(26).hasClass('devils')) && ($circles.eq(31).hasClass('devils')) && ($circles.eq(36).hasClass('devils')))
		|| (($circles.eq(22).hasClass('devils')) && ($circles.eq(27).hasClass('devils')) && ($circles.eq(32).hasClass('devils')) && ($circles.eq(37).hasClass('devils')))
		|| (($circles.eq(23).hasClass('devils')) && ($circles.eq(28).hasClass('devils')) && ($circles.eq(33).hasClass('devils')) && ($circles.eq(38).hasClass('devils')))) {
			return winner = 'devils';
		}
		// for (var i=0; i < 3; i++) {
		// 	if (matrix[i].hasClass('flyers') && matrix[i+7].hasClass('flyers') && matrix[i+14].hasClass('flyers') && matrix[i+21].hasClass('flyers')) {
		// 		return winner = 'flyers';
		// 	} 
		// } -- with this plan it would be a lot of this repeated, which wouldn't save a ton of time/space compared to initial hardcoding
	}

	// the doozy
	var checkWinner = function() {
		// real game functions nested inside of amusing chuck norris side-game
		// opportunity to play chuck norris only comes after completing 1 real game
		if (chuck == false) {
			checkVert();
			checkHorz();
			checkDiag();
			if (winner == 'flyers') {
				// adding animations for end-game
				$('.flyers').addClass('flyerswin');
				$('.devils').addClass('devilslose');
				$('.colbutton').prop('disabled', true);
				// counter for scoreboard
				flyerWins ++;
				$('.flyerwins').text('FLYERS: ' + flyerWins);
				alert('FLYERS WIN');
				// toggling play again/chuck norris button visibility
				$('.reset').css('visibility', 'visible');
				$('.chuck').css('visibility', 'visible');
				$('.chuck').prop('disabled', false);
				$('.reset').prop('disabled', false);
				// re-setting winner
				winner = 'none';
			} else if (winner == 'devils') {
					$('.devils').addClass('devilswin');
					$('.flyers').addClass('flyerslose');
					$('.colbutton').prop('disabled', true);
					devilWins ++;
					$('.devilwins').text('DEVILS: ' + devilWins);
					alert('DEVILS WIN');
					$('.reset').css('visibility', 'visible');
					$('.chuck').css('visibility', 'visible');
					$('.reset').prop('disabled', false);
					$('.chuck').prop('disabled', false);
					winner = 'none';
				// tie conditional
			} else if (tieCount == 41) {
					$('.flyers').addClass('flyerslose');
					$('.devils').addClass('devilslose');
					alert('GAME ENDS IN A TIE');
					$('.reset').css('visibility', 'visible');
					$('.chuck').css('visibility', 'visible');
					$('.reset').prop('disabled', false);
					$('.chuck').prop('disabled', false);
			} else {
					return;
			}
		} else if (chuck == true) {
				if (chuckCount == 3) {
					$('header').css('visibility', 'hidden');
					$('.board-container').css('visibility', 'hidden');
					$('body').css({'background-image': 'url("images/chuck.jpg")', 'background-size': '50%', 'background-repeat': 'no-repeat'});
				}
		}
	}

	// clearing the board while keeping cumulative score intact
	$('.reset').click(function() {
		$circles.removeClass();
		$circles.addClass('circle empty');
		$buttons.data('count', 0);
		$buttons.prop('disabled', false);
		$(this).prop('disabled', true);
		turn = true;
		$('.reset').css('visibility', 'hidden');
	})

	// chuck norris mechanics
	$('.chuck').click(function() {
		$('.reset').css('visibility', 'hidden');
		$circles.removeClass();
		$circles.addClass('circle empty');
		$buttons.data('count', 0);
		$buttons.prop('disabled', false);
		$(this).prop('disabled', true);
		$(this).css('visibility', 'hidden');
		$scoreBox.text('NOW PLAYING CHUCK NORRIS');
		turn = true;
		chuck = true;
	})


})


///// Realm of Abandoned/Dead/Testing code

	// var circleArray = [];

	// putting circles in Array
	// for (var i=0; i < $circles.length; i++) {
	// 	circleArray.push($circles[i]);
	// }

	// $circles.eq(0).click(function() { -- testing to change color of circle on click, works
	// 	$(this).attr('style', 'background-color: red');
	// })

	// decided on click functionality for buttons, but this was useful testing
	// in case i want to set circle color on click
	// $circles.click(function() {
	// 	if (turn == true) {
	// 		$(this).attr('style', 'background-color: red');
	// 		turn = false;
	// 	} else if (turn == false) {
	// 		$(this).attr('style', 'background-color: black');
	// 		turn = true;
	// 	}
	// })

	// for (var i=0; i < 42; i++) { -- this was my first run, but trying out column divs instead
	// 	$newCircle = $('<div>');
	// 	$newCircle.addClass('circle');
	// 	$gameBoard.append($newCircle);
	// }

	// do i need to make an array?