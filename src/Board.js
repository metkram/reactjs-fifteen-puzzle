import React from "react";
import Tile from "./Tile";

function Board(props) {
  function createTile(number) {
    return(
      <Tile value={number} />
    );
  }

  function fillBoard(tiles) {
    return tiles.map(tile => {
      const tileClasses = "tile noselect";
      const zeroTileClasses = "zerotile noselect";
      return <div key={tile} className={tile == 0 ? zeroTileClasses : tileClasses}onMouseDown={() => props.handleClick(tile)}>
               {createTile(tile)}
             </div>;
    });
  }

  return(
    <div>
      {fillBoard(props.tiles)}
    </div>
  );
}

export default Board;
