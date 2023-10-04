const boards = require('./bingoBoards');

const drawnNumbers = [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1];

let lastDrawnNumber = null;
let winningBoards = [];
let lastWiningBoards = [];


for (const number of drawnNumbers) {
    for (const boardName in boards) {
      const board = boards[boardName];
      let found = false;
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
          if (board[row][col] === number) {
            board[row][col] = -1;
            found = true;
            lastDrawnNumber = number;
        }
      }
    }

    if (found && checkBoardForWin(board)) {
      const winningBoardData = { name: boardName, number };
      const LastWinningBoardData = { name: boardName, board: board, number };

      lastWiningBoards = lastWiningBoards.filter(lastBoard => lastBoard.number === number);
      lastWiningBoards.push(LastWinningBoardData);
      winningBoards.push(winningBoardData);

      delete boards[boardName];
  }
}
}


console.log("Winning Boards (in order of winning):");
winningBoards.forEach((board, index) => {
    console.log(`Board ${board.name} won on drawn number ${board.number}`);
});

let finalScores = [];
for (const lastBoard of lastWiningBoards) {
    const boardName = lastBoard.name;
    const board = lastBoard.board; 
    const score = calculateFinalScore(board, lastBoard.number);
    finalScores.push({ name: boardName, score });
}

console.log("last wining boards:" +   JSON.stringify(finalScores, null, 2));

if (finalScores.length === 1) {
  console.log(`The final score of the last winning board is ${finalScores[0].score}`);
} else {
  const lowestScoreBoard = finalScores.reduce((minBoard, currentBoard) => {
      return currentBoard.score < minBoard.score ? currentBoard : minBoard;
  });

  console.log(`more than one board won on the last number, so the last board to win with the least score is: ${lowestScoreBoard.name}
   on drawn number ${lastDrawnNumber}
    with the final score of ${lowestScoreBoard.score}`);
}


function calculateFinalScore(board, winningNumber) {
  const sumOfUnmarkedNumbers = board.flat().reduce((acc, num) => num !== -1 ? acc + num : acc, 0);
  return sumOfUnmarkedNumbers * winningNumber;
}


function checkBoardForWin(board) {
    for (let row = 0; row < 5; row++) {
      if (board[row].every((cell) => cell === -1)) {
        return true;
      }
    }
    for (let col = 0; col < 5; col++) {
      if (board.every((row) => row[col] === -1)) {
        return true;
      }
    }
  
    return false;
  }


