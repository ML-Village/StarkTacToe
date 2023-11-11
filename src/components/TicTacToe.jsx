import { useState, useEffect } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import Reset from "./Reset";
import gameOverSoundAsset from "../sounds/game_over.wav";
import clickSoundAsset from "../sounds/click.wav";

const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5;

const PLAYER_X = "X";
const PLAYER_O = "O";

const winningCombinations = [
  //Rows
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },

  //Columns
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },

  //Diagonals
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

function checkWinner(tiles, setStrikeClass, setGameState) {
  for (const { combo, strikeClass } of winningCombinations) {
    const tileValue1 = tiles[combo[0]];
    const tileValue2 = tiles[combo[1]];
    const tileValue3 = tiles[combo[2]];

    if (
      tileValue1 !== null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      setStrikeClass(strikeClass);
      if (tileValue1 === PLAYER_X) {
        setGameState(GameState.playerXWins);
      } else {
        setGameState(GameState.playerOWins);
      }
      return;
    }
  }

  const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
  if (areAllTilesFilledIn) {
    setGameState(GameState.draw);
  }
}

function TicTacToe() {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [strikeClass, setStrikeClass] = useState();
  const [gameState, setGameState] = useState(GameState.inProgress);

  const handleTileClick = (index) => {
    if (gameState !== GameState.inProgress) {
      return;
    }

    if (tiles[index] !== null) {
      return;
    }

    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);
    if (playerTurn === PLAYER_X) {
      setPlayerTurn(PLAYER_O);
    } else {
      setPlayerTurn(PLAYER_X);
    }
  };

  const handleReset = () => {
    setGameState(GameState.inProgress);
    setTiles(Array(9).fill(null));
    setPlayerTurn(PLAYER_X);
    setStrikeClass(null);
  };

  const parseBoardFlat = (tiles) => {
    let board = [];
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i] === PLAYER_X) {
        board.push(1);
      } else if (tiles[i] === PLAYER_O) {
        board.push(0);
      } else {
        board.push(2);
      }
    }
    return board;
  };

  const parseBoard3by3 = (tiles) => {
    let row1 = [];
    let row2 = [];
    let row3 = [];
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i] === PLAYER_X) {
        i%3 === 0 ? row1.push(1) : i%3 === 1 ? row2.push(1) : row3.push(1);
      } else if (tiles[i] === PLAYER_O) {
        i%3 === 0 ? row1.push(0) : i%3 === 1 ? row2.push(0) : row3.push(0);
      } else {
        i%3 === 0 ? row1.push(2) : i%3 === 1 ? row2.push(2) : row3.push(2);
      }
    }
    return [row1, row2, row3];
  };

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setGameState);
  }, [tiles]);

  useEffect(() => {
    if (tiles.some((tile) => tile !== null)) {
      clickSound.play();
    }
  }, [tiles]);

  useEffect(() => {
    if (gameState !== GameState.inProgress) {
      gameOverSound.play();
    }
  }, [gameState]);

  return (
    <div className="flex flex-col justify-center items-center">

      <div className="flex flex-row justify-center items-center">

        <img src="/stark.png" alt="stark logo" className="h-16"/>
        <h1 className="mx-8 font-bold text-4xl text-[#28286B]
        my-8
        ">Stark Tac Toe</h1>
        <img src="/cuteRobot2.png" alt="cute robot" className="h-20"/>
      </div>
      <Board
        playerTurn={playerTurn}
        tiles={tiles}
        onTileClick={handleTileClick}
        strikeClass={strikeClass}
      />
      
      <button className="
      my-4
      py-1 px-2 bg-orange-500 mx-auto border rounded-lg"
      
      onClick={()=>{console.log(parseBoard3by3(tiles))}}
      >
        Game State
        </button>

      <GameOver gameState={gameState} />
      <Reset gameState={gameState} onReset={handleReset} />
    </div>
  );
}

export default TicTacToe;