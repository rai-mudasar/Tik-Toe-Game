
import { useEffect, useState } from "react";

import "./App.css";
import Box from "./components/box";

function App() {
  const [state, setState] = useState(Array(9).fill(null));
  const [winPlayer, setWinPlayer] = useState(null);
  const [currentTurn, setCurrentTurn] = useState("x");

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

    for(let i=0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if(state[a] !== null && state[a] === state[b] && state[a] === state[c]) return true;
    };

    return false;
  };
  
  const clearBoard = () => {
    setTimeout( () => {
      state.fill(null);
      setState(state);
      setWinPlayer(null);
    }, 700)
  }

  const manageBlockClick = (index) => {

    if (state[index] !== null) return;
    const stateCopy = Array.from(state);
    stateCopy[index] = currentTurn;
    
    const win = checkWinner(stateCopy);
    
    if(win) {
      const winPlayer = (currentTurn === "x") ? "Player 1 Won" : "Player 2 Won";
      setWinPlayer(winPlayer);
      setState(stateCopy);
      clearBoard();
      return
    } else{ 
      setCurrentTurn(currentTurn === "x" ? "o" : "x");
      setState(stateCopy);
    }
  };

  return (
    <div className="w-full h-screen pt-20 flex items-center flex-col">
      <h1 className="text-2xl font-bold text-amber-400 mb-10">
        Tic Tac Toe <span className="text-amber-50">Game</span>
      </h1>
      <div className="board w-80 h-80 bg-amber-50 flex flex-col gap-1.5 items-center justify-center">
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
      <div className="win-board">
        <h3 className=" font-bold text-amber-400 mt-10">{winPlayer}</h3>
      </div>
    </div>
  );
}

export default App;
