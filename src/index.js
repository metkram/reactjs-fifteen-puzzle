import React from "react";
import ReactDOM from "react-dom";
import Board from "./Board";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";
import './index.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: this.newTilesSet(),
      steps: 0,
      time: 0,
      isSolved: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem("stateJson")) {
      const state = JSON.parse(sessionStorage.getItem("stateJson"));
      this.setState(state);
    }
    this.timer = setInterval(() => this.increaseTime(), 1000);
  }

  componentDidUpdate() {
    this.saveData();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  newGame() {
    const state = {
      tiles: this.newTilesSet(),
      steps: 0,
      time: 0,
      isSolved: false,
    };
    this.setState(state);
  }

  newTilesSet() {
    const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    for (let i = 0; i < tiles.length; i++) {
      const randomIndex = Math.floor(Math.random() * tiles.length);
      [tiles[i], tiles[randomIndex]] = [tiles[randomIndex], tiles[i]];
    }

    if (this.isSolvable(tiles)) {
      tiles.push(0);
      return tiles;
    } else {
      return this.newTilesSet();
    }
  }

  isSolvable(set) {
    let result = 0;
    let newSet = [...set.slice(0, 4), ...set.slice(4, 8).reverse(), ...set.slice(8, 12), ...set.slice(12).reverse()];
    for (let i = 1; i < newSet.length; i++) {
      if (set[i] < set[i - 1]) result++;
    }
    return (result % 2) == 0;
  }

  handleClick(i) {
    this.changePosition(i);
  }

  saveData() {
    const state = JSON.stringify(this.state);
    sessionStorage.setItem("stateJson", state);
  }

  changePosition(number) {
    const numberSet = this.state.tiles.slice();
    const zeroPosition = numberSet.indexOf(0);
    const numberPosition = numberSet.indexOf(number);

    if (this.possibleMoves(zeroPosition).includes(numberPosition)) {
      [numberSet[zeroPosition], numberSet[numberPosition]] = [numberSet[numberPosition], numberSet[zeroPosition]];
      this.setState(state => ({tiles: numberSet, steps: state.steps + 1}));
    }

    if (this.checkWin(numberSet)) this.setState({isSolved: true});
  }

  possibleMoves(zero) {
    const set = [
      zero - 4,
      (zero == 3 || zero == 7 || zero == 11) ? -1 : zero + 1,
      zero + 4,
      (zero == 4 || zero == 8 || zero == 12) ? -1 : zero - 1,
    ];

    return set.filter(number => number >= 0 && number <= 15);
  }

  checkWin(numberSet) {
    const winSet = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0].join();
    return winSet == numberSet.join();
  }

  increaseTime() {
    if (this.state.steps) {
      this.setState(state => ({time: state.time + 1}));
    }
  }

  render() {
    return(
      <div className={"board"}>
        <div className={"info"}>
          {this.state.isSolved ? "You win" : `Moves: ${this.state.steps} Time: ${this.state.time} seconds`}
        </div>
        <div className={"tiles"}>
          <Board tiles={this.state.tiles} handleClick={this.handleClick} />
        </div>
        <div className={"buttons"}>
          <button className={"btn waves-effect waves-light"} onClick={() => this.newGame()}>
            New game
          </button>
          <a className="waves-effect waves-light btn" href="/">go home</a>
          <a className="waves-effect waves-light btn" href="https://github.com/metkram/reactjs-fifteen-puzzle">github repo</a>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById('root'));
