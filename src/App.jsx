import { useEffect, useState } from "react";

import "./App.css";
import Box from "./components/box";

function App() {
  const [state, setState] = useState(Array(9).fill(null));
  const [winPlayer, setWinPlayer] = useState(null);
  const [currentTurn, setCurrentTurn] = useState("x");
  const [gameOver, setGameOver] = useState(false);

  const checkWinner = (state) => {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c])
        return true;
    }

    return false;
  };

  const clearBoard = () => {
      state.fill(null);
      setState(state);
      setWinPlayer(null);
      setGameOver(false);
  };

  const checkForGameOver = (state) => {
    for (let i = 0; i < 9; i++) {
      if (state[i] === null) {
        return;
      }
    }
    setGameOver(true);
  };

  const manageBlockClick = (index) => {
    if (state[index] !== null) return;
    const stateCopy = Array.from(state);
    stateCopy[index] = currentTurn;

    const win = checkWinner(stateCopy);

    if (win) {
      const winPlayer = currentTurn === "x" ? "Player 1 Won" : "Player 2 Won";
      setWinPlayer(winPlayer);
      setState(stateCopy);
      setGameOver(true);
      return;
    } else {
      setCurrentTurn(currentTurn === "x" ? "o" : "x");
      setState(stateCopy);
    }

    checkForGameOver(stateCopy);
  };

  return (
    <div className="w-full h-screen flex items-center flex-col">
      <h1 className="text-2xl font-bold text-amber-400 mb-8 mt-12">
        Tic Tac Toe <span className="text-white">Game</span>
      </h1>
      <div className="text-bold text-amber-400 flex gap-40 mb-2">
        <p>Player 1: X</p>
        <p>Player 2: O</p>
      </div>
      <div className="board w-80 h-80 bg-white flex flex-col gap-1.5 items-center justify-center">
        <div className="row flex gap-1.5">
          <Box onClick={() => manageBlockClick(0)} value={state[0]} />
          <Box onClick={() => manageBlockClick(1)} value={state[1]} />
          <Box onClick={() => manageBlockClick(2)} value={state[2]} />
        </div>
        <div className="row flex gap-1.5">
          <Box onClick={() => manageBlockClick(3)} value={state[3]} />
          <Box onClick={() => manageBlockClick(4)} value={state[4]} />
          <Box onClick={() => manageBlockClick(5)} value={state[5]} />
        </div>
        <div className="row flex gap-1.5">
          <Box onClick={() => manageBlockClick(6)} value={state[6]} />
          <Box onClick={() => manageBlockClick(7)} value={state[7]} />
          <Box onClick={() => manageBlockClick(8)} value={state[8]} />
        </div>
      </div>

      {gameOver ? (
        <>
          {winPlayer ? ( 
            <h3 className="font-bold text-amber-400 mt-7">{winPlayer}</h3> )
            : (<h3 className="font-bold text-amber-400 mt-7">Game Draw</h3> )
          }

          <div className="mt-5 hover:shadow-xl/30 hover:shadow-amber-400/70 rounded-4xl">
            <button onClick={clearBoard} className="font-bold text-white bg-amber-500  cursor-pointer p-2 rounded-4xl hover:bg-amber-600 transition transform duration-200 hover:scale-105">
              Play Again
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default App;
