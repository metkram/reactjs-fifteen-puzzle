import React from "react";
import ReactDOM from "react-dom";
import Board from "./Board"
import './index.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: this.newTilesSet(),
    };
  }
  newTilesSet() {
    const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    for (let i = 0; i < tiles.length; i++) {
      const randomIndex = Math.floor(Math.random() * tiles.length);
      [tiles[i], tiles[randomIndex]] = [tiles[randomIndex], tiles[i]]
    }
    tiles.push(0);
    return tiles;
  }
  render() {
    const className = "board";
    return(
      <div className={className}>
        <Board tiles={this.state.tiles} />
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById('root'));
