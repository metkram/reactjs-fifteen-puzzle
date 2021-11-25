import React from "react";

class Tile extends React.Component {
  render() {
    return(
      <p className={"number"}>{this.props.value}</p>
    );
  }
}

export default Tile;
