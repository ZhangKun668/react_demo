import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class Square extends React.Component {

  render() {
    return (
      <button className="square" onClick={() => { this.props.onClick() }}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.square[i]} onClick={() => this.props.onClick(i)} />;
  }

  render() {
    return (
      <div>
        {/* <div className="status">{status}</div> */}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        { square: Array(9).fill(null) }
      ],
      isX: true,
      stepNumbeer: 0,
    }
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const square = current.square.slice();
    // 如果已有胜出者，或者该位置上已落子，则不作任何动作
    if(calculateWinner(square) || square[i]) {
      return;
    }
    square[i] = this.state.isX ? "X" : "O";
    this.setState({ history: history.concat([{ square: square }]), isX: !this.state.isX })
  }

  jump(step) {
    this.setState({stepNumbeer: step, isX: (step % 2) === 0})
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.square);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";

      return (
        <li key={move}>
          <button onClick={() => this.jump(move)}>{desc}</button>
        </li>
      )
    })

    let status = "";
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.isX ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board square={current.square} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// 计算胜出者
function calculateWinner(square) {
  const line = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for(let i = 0; i < line.length; i++) {
    const [a, b , c] = line[i];
    if(square[a] && square[a] == square[b] && square[a] == square[c]) {
      return square[a]
    }
  }

  return null
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
