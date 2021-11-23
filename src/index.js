import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Game extends React.Component {
  render() {
    return(
      <div>
        This is going to be Fifteen Puzzle game
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById('root'));
