import React from "react";
import ReactDOM from "react-dom";
import Board from "./Board"
import './index.css';

class Game extends React.Component {
  render() {
    const className = "board";
    return(
      <div className={className}>
        <Board />
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById('root'));
