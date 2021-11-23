import React from "react";
import Tile from "./Tile";

class Board extends React.Component {
  createTile(number) {
    return(
      <Tile number={number} />
    );
  }
  render() {
    return(
      <div>
        <div className={"line"}>
          {this.createTile(1)}
          {this.createTile(2)}
          {this.createTile(3)}
          {this.createTile(4)}
        </div>
        <div className={"line"}>
          {this.createTile(5)}
          {this.createTile(6)}
          {this.createTile(7)}
          {this.createTile(8)}
        </div>
        <div className={"line"}>
          {this.createTile(9)}
          {this.createTile(10)}
          {this.createTile(11)}
          {this.createTile(12)}
        </div>
        <div className={"line"}>
          {this.createTile(13)}
          {this.createTile(14)}
          {this.createTile(15)}
          {this.createTile(0)}
        </div>
      </div>
    );
  }
}

export default Board;
