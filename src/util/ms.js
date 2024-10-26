import { useMemo } from "react";

const boardSize = 10;
const mineCount = 10;
let board = [];
let gameOver = false;
let openedCells = 0;

const statusText = document.getElementById("status");
const boardContainer = document.getElementById("board");

function initBoard() {
    useMemo(())
	// 1. 초기화
	board = Array.from({ length: boardSize }, () =>
		Array(boardSize).fill({
			mine: false,
			revealed: false,
			adjacentMines: 0,
		})
	);
	gameOver = false;
	openedCells = 0;
	statusText.innerText = "게임 중...";

	// 2. 지뢰 배치
	let minesPlaced = 0;
	while (minesPlaced < mineCount) {
		const row = Math.floor(Math.random() * boardSize);
		const col = Math.floor(Math.random() * boardSize);
		if (!board[row][col].mine) {
			board[row][col].mine = true;
			minesPlaced++;
		}
	}

	// 3. 인접 지뢰 수 계산
	for (let r = 0; r < boardSize; r++) {
		for (let c = 0; c < boardSize; c++) {
			if (!board[r][c].mine) {
				board[r][c].adjacentMines = countAdjacentMines(r, c);
			}
		}
	}

	// 4. 보드 UI 초기화
	renderBoard();
}
