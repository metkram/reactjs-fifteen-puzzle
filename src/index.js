import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import Board from "./Board";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import './index.css';


function Game(props) {
  const [tiles, setTiles] = useState(newTilesSet());
  const [steps, setSteps] = useState(0);
  const [gameStarted, setGameStarted] = useState(Date.now());
  const [gameElapsed, setGameElapsed] = useState(getGameTime());
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("state")) {
      const state = JSON.parse(sessionStorage.getItem("state"));
      setTiles(state.tiles);
      setSteps(state.steps);
      setGameStarted(state.gameStarted);
      setIsSolved(state.isSolved);
    } else {
      newGame();
    }
  }, []);

  useEffect(() => {
    saveData();
  }, [tiles, steps, isSolved]);

  useEffect(() => {
      const timer = setInterval(() => {setGameElapsed(getGameTime())}, 1000);
      return () => clearInterval(timer);
  });

  function newGame() {
    setTiles(newTilesSet());
    setSteps(0);
    setGameStarted(Date.now());
    setIsSolved(false);
  }

  function newTilesSet() {
    const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    for (let i = 0; i < tiles.length; i++) {
      const randomIndex = Math.floor(Math.random() * tiles.length);
      [tiles[i], tiles[randomIndex]] = [tiles[randomIndex], tiles[i]];
    }

    if (isSolvable(tiles)) {
      tiles.push(0);
      return tiles;
    } else {
      return newTilesSet();
    }
  }

  function isSolvable(set) {
    let result = 0;
    let newSet = [...set.slice(0, 4), ...set.slice(4, 8).reverse(), ...set.slice(8, 12), ...set.slice(12).reverse()];
    for (let i = 1; i < newSet.length; i++) {
      if (set[i] < set[i - 1]) result++;
    }
    return (result % 2) == 0;
  }

  function handleClick(i) {
    changePosition(i);
  }

  function saveData() {
    const state = {
      "tiles": tiles,
      "gameStarted": gameStarted,
      "steps": steps,
      "isSolved": isSolved,
    };
    sessionStorage.setItem("state", JSON.stringify(state));
  }

  function changePosition(number) {
    const numberSet = tiles.slice();
    const zeroPosition = numberSet.indexOf(0);
    const numberPosition = numberSet.indexOf(number);

    if (possibleMoves(zeroPosition).includes(numberPosition)) {
      [numberSet[zeroPosition], numberSet[numberPosition]] = [numberSet[numberPosition], numberSet[zeroPosition]];
      setTiles(numberSet);
      setSteps(steps + 1);
      setGameElapsed(getGameTime());
    }
    if (checkWin(numberSet)) {
      setIsSolved(true);
    }
  }

  function possibleMoves(zero) {
    const set = [
      zero - 4,
      (zero == 3 || zero == 7 || zero == 11) ? -1 : zero + 1,
      zero + 4,
      (zero == 4 || zero == 8 || zero == 12) ? -1 : zero - 1,
    ];

    return set.filter(number => number >= 0 && number <= 15);
  }

  function checkWin(numberSet) {
    const winSet = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0].join();
    return winSet == numberSet.join();
  }

  function getGameTime() {
    return Math.floor((Date.now() - gameStarted)/1000);
  }

  return(
    <div className={"board"}>
      <div className={"info"}>
        {isSolved ? "You win" : `Moves: ${steps} Time: ${gameElapsed} seconds`}
      </div>
      <div className={"tiles"}>
        <Board tiles={tiles} handleClick={handleClick} />
      </div>
      <div className={"buttons"}>
        <button className={"btn waves-effect waves-light"} onClick={() => newGame()}>
          New game
        </button>
        <a className="waves-effect waves-light btn" href="/">go home</a>
        <a className="waves-effect waves-light btn" href="https://github.com/metkram/reactjs-fifteen-puzzle">github repo</a>
      </div>
    </div>
  );

}

ReactDOM.render(<Game />, document.getElementById('root'));
