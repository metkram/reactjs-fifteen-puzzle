import React from "react";
import Tile from "./Tile";

class Board extends React.Component {
  createTile(number) {
    return(
      <Tile number={number} />
    );
  }
  
  fillBoard(tiles) {
    return tiles.map(tile => {
      const className = "tile noselect";
      return <div key={tile} className={className}>{this.createTile(tile)}</div>;
    });
  }

  render() {
    return(
      <div>
        {this.fillBoard(this.props.tiles)}
      </div>
    );
  }
}

export default Board;
