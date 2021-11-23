import React from "react";

class Tile extends React.Component {
  render() {
    const className = "tile";
    return(
      <div className={className}>
        <p className={"number"}>{this.props.number}</p>
      </div>
    );
  }
}

export default Tile;
