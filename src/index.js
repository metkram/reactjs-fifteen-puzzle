import React from "react";
import ReactDOM from "react-dom";
import Board from "./Board"
import './index.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: this.newTilesSet(),
      isSolved: false,
    };
    this.handleClick = this.handleClick.bind(this);
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
    for (let i = 1; i < set.length; i++) {
      if (set[i] < set[i - 1]) result++;
    }
    return (result % 2) == 0;
  }

  handleClick(i) {
    this.changePosition(i);
  }

  changePosition(number) {
    const numberSet = this.state.tiles.slice();
    const zeroPosition = numberSet.indexOf(0);
    const numberPosition = numberSet.indexOf(number);

    if (this.possibleMoves(zeroPosition).includes(numberPosition)) {
      [numberSet[zeroPosition], numberSet[numberPosition]] = [numberSet[numberPosition], numberSet[zeroPosition]];
      this.setState({tiles: numberSet});
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

  render() {
    const className = "board";
    return(
      <div className={className}>
        <Board tiles={this.state.tiles} handleClick={this.handleClick} />
        <div className={"info"}>
          {this.state.isSolved ? "You win" : "Keep going"}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById('root'));
