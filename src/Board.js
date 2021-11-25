import React from "react";
import Tile from "./Tile";

class Board extends React.Component {
  createTile(number) {
    return(
      <Tile value={number} />
    );
  }

  fillBoard(tiles) {
    return tiles.map(tile => {
      const tileClasses = "tile noselect";
      const zeroTileClasses = "zerotile noselect";
      return <div key={tile} className={tile == 0 ? zeroTileClasses : tileClasses}onMouseDown={() => this.props.handleClick(tile)}>
               {this.createTile(tile)}
             </div>;
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
