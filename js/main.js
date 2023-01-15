/*----- constants -----*/
const COLORS = {
	"0": "white",
	"1": "purple",
	"-1": "orange"
};

/*----- state variables -----*/
// array of col arrays
let board;
// 1 or -1 to represent player turns
let turn;
// will hold the value of null which means there is no winner; 1 or -1 means there is a winner; "T" = tie game
let winner;

/*----- cached elements  -----*/
const messageEl = document.querySelector("h1");
const playAgainButton = document.querySelector("button");
// selecting all the children divs of the markers
const markerEls = [...document.querySelectorAll("#markers > div")];

/*----- event listeners -----*/
// name of event is always string, then callback function
document.getElementById("markers").addEventListener("click", handleDrop);

/*----- functions -----*/
init();

// Initialize all state, then call render()
function init() {
	// calls the board state variable;
	// to visualize the boards mapping to the DOM rotate the board array 90 degrees counter-clockwise
	board = [
		// adds elements from bottomleft and up
		[0, 0, 0, 0, 0, 0], // col 0
		[0, 0, 0, 0, 0, 0], // col 1
		[0, 0, 0, 0, 0, 0], // col 2
		[0, 0, 0, 0, 0, 0], // col 3
		[0, 0, 0, 0, 0, 0], // col 4
		[0, 0, 0, 0, 0, 0], // col 5
		[0, 0, 0, 0, 0, 0], // col 6
	];
	turn = 1;
	// game is in play so there is no winner
	winner = null;
	render();
}

// Visualize all state in the DOM
function render() {
	renderBoard();
	renderMessage();
	// Hide/show UI elements (controls on the page)
	renderControls();
}

function renderBoard() {
	board.forEach(function(colArr, colIdx) {
		// Iterate over the cells in the cur column (colArr)
		colArr.forEach(function(cellVal, rowIdx) {
			const cellId = `c${colIdx}r${rowIdx}`;
			const cellEl = document.getElementById(cellId);
		// using square bracket notation to access variable dynamically
			cellEl.style.backgroundColor = COLORS[cellVal];
		});
	});
}

function renderMessage() {
	if (winner === "T") {
		messageEl.innerText = "It's a Tie!!!";

	} else if (winner) {
		messageEl.innerHTML = `<span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> Wins!`;

	} else {
		// Game is in play; using inline styling with the span tag
		messageEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`;
	}
}

function renderControls() {
	// Ternary expression is the go to when you want 1 of 2 values returned
	// <conditional expression> ? <true expression> : <false expression>
	playAgainButton.style.visibility = winner ? "visible" : "hidden";
	// Iterate over the marker elements to hide/show
	// according to the column being full [no 0's] or not
	markerEls.forEach(function(markerEl, colIdx) {
		const hideMarker = !board[colIdx].includes(0) || winner;
		markerEl.style.visibility = hideMarker ? "hidden" : "visible";
	});
}

// In response to user interaction, update all impacted 
// state, then call render();
function handleDrop(event) {
	const colIdx = markerEls.indexOf(event.target);
	// Guards...
	if (colIdx === -1) return;
	// Shortcut to the column array
	const colArr = board[colIdx];
	// Find the index of the first 0 in colArr
	const rowIdx = colArr.indexOf(0);
	// Update the board state with the current player value (turn)
	colArr[rowIdx] = turn;
	// Switch player turn
	turn *= -1;
	// Check for winner
	winner = getWinner();	

	render();
}

function getWinner() {
	
}