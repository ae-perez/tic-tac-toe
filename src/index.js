import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import cloud from './cloudy.png';

console.log(cloud);

/* ******************************* VERSION ONE *******************************
In this version, there is no history bank, so you won't be able to see the history of the game.
I have just designed it differently to make it simple and aesthetically pleasing
October/11/2020 Alejandra Perez
*/

function Square(props) {
    /*In this new square, we got rid of the class Square because we are now using function components.
    It is a simpler way to write components that only contain a render method and don't have state.
    
    It takes props as input and returns what should be rendered.*/
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
  
class Board extends React.Component {
      /*constructor that sets the board's initial state to contain an array of 9 nulls
      corresponding to the 9 squares*/
     constructor(props) { 
         super(props);
         this.state = {
             squares: Array(9).fill(null),
             xIsNext: true, //setting up props for 'o'
         };
     }

     handleClick(i) {
         const squares = this.state.squares.slice();
         if(calculateWinner(squares) || squares[i]) {
             return; //will stop x's and o's b/c a winner is declared
         }
         squares[i] = this.state.xIsNext ? 'x' : 'o';
         this.setState({
             squares: squares,
            /* This boolean will flip to determine which player goes next and
            the games state will be saved
            If is xIsNext is not true then it will place a 'o' */
            xIsNext: !this.state.xIsNext 
        });
     }


    renderSquare(i) {
      return (<Square 
        value={this.state.squares[i]}
        /* Pass down a function from the board to the square > have a square call
        that function when a square is clicked*/
        onClick={() => this.handleClick(i)}/>); //value is a prop being passed into square
    }
  
    render() {
        // This allows you to see the next player displayed on top of board -- and whos next
        const winner = calculateWinner(this.state.squares);
        let status;
        if(winner) {
            status = 'Player  ' + winner + ' wins!';
        } else {
            status = 'Go, player: ' + (this.state.xIsNext ? 'x!' : 'o!');
        }
      
  
      return (
        <div>
          <div className="status">{status}</div>
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
    render() {
      return (
          <div>
              <div className="cloud-div">
                <img className="cloud1" src={cloud} alt="cloud" />
                <img className="cloud2" src={cloud} alt="cloud" />
                <img className="cloud3" src={cloud} alt="cloud" />
              </div>
              <div className="game">
                  <div className="game-board">
                      <Board />
                    </div>
                    <div className="game-info">
              
                    <div>{/*status*/}</div>
                        <ol>{/* TODO */}</ol>
                    </div>
                </div>
          </div>    
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')

  );


  /* Helper Function
  allows for */
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }