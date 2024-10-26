import React, { useState, useEffect } from "react";
import {
	Button,
	Grid2,
	Typography,
	FormControl,
	FormControlLabel,
	FormLabel,
	RadioGroup,
	Radio,
} from "@mui/material";

export default function MineSweeper() {
	const [boardSize, setBoardSize] = useState(10);
	const [board, setBoard] = useState([]);
	const [gameOver, setGameOver] = useState(false);
	const [status, setStatus] = useState("게임 중...");
	const [openedCells, setOpenedCells] = useState(0);

	const mineCount = boardSize;

	// 거리 계산 함수
	const countAdjacentMines = (board, row, col) => {
		let count = 0;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				const r = row + i;
				const c = col + j;
				if (
					r >= 0 &&
					r < boardSize &&
					c >= 0 &&
					c < boardSize &&
					board[r][c].mine
				) {
					count++;
				}
			}
		}
		return count;
	};

	const createBoard = () => {
		const board = Array.from({ length: boardSize }, () =>
			Array(boardSize).fill({
				mine: false,
				revealed: false,
				adjacentMines: 0,
			})
		);

		// 지뢰 배치
		let minesPlaced = 0;
		while (minesPlaced < mineCount) {
			const row = Math.floor(Math.random() * boardSize);
			const col = Math.floor(Math.random() * boardSize);
			if (!board[row][col].mine) {
				board[row][col] = { ...board[row][col], mine: true };
				minesPlaced++;
			}
		}

		// 인접 지뢰 수 계산
		for (let r = 0; r < boardSize; r++) {
			for (let c = 0; c < boardSize; c++) {
				if (!board[r][c].mine) {
					board[r][c] = {
						...board[r][c],
						adjacentMines: countAdjacentMines(board, r, c),
					};
				}
			}
		}
		return board;
	};

	// 보드 사이즈가 변경될 때마다 보드를 생성
	useEffect(() => {
		setBoard(createBoard());
		setGameOver(false);
		setStatus("게임 중...");
		setOpenedCells(0);
	}, [boardSize]);

	const handleClick = (row, col) => {
		if (gameOver || board[row][col].revealed) return;

		const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
		const cell = newBoard[row][col];
		cell.revealed = true;

		if (cell.mine) {
			cell.revealed = true;
			setBoard(newBoard);
			setStatus("게임 오버! 지뢰를 클릭했습니다.");
			setGameOver(true);
			revealMines(newBoard);
			return;
		}

		setOpenedCells(openedCells + 1);
		if (cell.adjacentMines === 0) {
			revealAdjacentCells(newBoard, row, col);
		}

		setBoard(newBoard);
	};

	const revealAdjacentCells = (board, row, col) => {
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				const r = row + i;
				const c = col + j;
				if (
					r >= 0 &&
					r < boardSize &&
					c >= 0 &&
					c < boardSize &&
					!board[r][c].revealed &&
					!board[r][c].mine
				) {
					board[r][c].revealed = true;
					setOpenedCells((openedCells) => openedCells + 1);
					if (board[r][c].adjacentMines === 0) {
						revealAdjacentCells(board, r, c);
					}
				}
			}
		}
	};

	const revealMines = (board) => {
		for (let r = 0; r < boardSize; r++) {
			for (let c = 0; c < boardSize; c++) {
				if (board[r][c].mine) {
					board[r][c].revealed = true;
				}
			}
		}
		setBoard(board);
	};

	const resetGame = () => {
		setBoard(createBoard());
		setGameOver(false);
		setStatus("게임 중...");
		setOpenedCells(0);
	};

	const handleChange = (event) => {
		setBoardSize(Number(event.target.value));
	};

	return (
		<Grid2 container spacing={2}>
			<Grid2 size={2}></Grid2>
			<Grid2 container size={8} direction="column" alignContent="center">
				<Grid2 textAlign="center">
					<Typography variant="h4">지뢰찾기 게임</Typography>
				</Grid2>
				<Grid2>
					<div style={{ textAlign: "center" }}>
						<Typography variant="body1">{status}</Typography>
						<FormControl>
							<FormLabel>Size</FormLabel>
							<RadioGroup
								row
								value={boardSize}
								onChange={handleChange}
							>
								<FormControlLabel
									value={10}
									control={<Radio />}
									label="10"
								/>
								<FormControlLabel
									value={20}
									control={<Radio />}
									label="20"
								/>
								<FormControlLabel
									value={30}
									control={<Radio />}
									label="30"
								/>
							</RadioGroup>
						</FormControl>
						<Button variant="contained" onClick={resetGame}>
							Reset
						</Button>
						<div
							style={{
								display: "grid",
								gridTemplateColumns: `repeat(${boardSize}, 30px)`,
								gap: "2px",
								justifyContent: "center",
								marginTop: "20px",
							}}
						>
							{board.map((row, rIdx) =>
								row.map((cell, cIdx) => (
									<div
										key={`${rIdx}-${cIdx}`}
										onClick={() => handleClick(rIdx, cIdx)}
										style={{
											width: "30px",
											height: "30px",
											backgroundColor: cell.revealed
												? cell.mine
													? "#ff6666"
													: "#e0e0e0"
												: "#bdbdbd",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											fontWeight: "bold",
											fontSize: "16px",
											cursor: cell.revealed
												? "default"
												: "pointer",
											color:
												cell.adjacentMines > 0
													? "black"
													: "transparent",
										}}
									>
										{cell.revealed && cell.adjacentMines > 0
											? cell.adjacentMines
											: ""}
									</div>
								))
							)}
						</div>
					</div>
				</Grid2>
			</Grid2>
		</Grid2>
	);
}
