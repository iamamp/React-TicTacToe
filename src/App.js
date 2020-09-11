import React, { Component } from 'react';
import './App.css';

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [['','',''],['','',''],['','','']],
      next: 'X',
      msg: '',
      reset: false
    };
    this.parentClick = this.parentClick.bind(this);
    this.reset = this.reset.bind(this);
  }

  parentClick(e) {
    console.log('inside parentClick')
    
    let row = e.target.getAttribute("row")
    let col = e.target.getAttribute("col")

    this.setState(({grid}) => {
      console.log('inside setState grid')
      let prevGrid = grid //create a copy of previous state
      if(this.state.next==="X") prevGrid[row][col] = "X"
      else if(this.state.next==="O") prevGrid[row][col] = "O"
      
      console.log(this.state.grid)
      
      if(this.validate()){
        return {
          msg: this.state.next+' wins!',
          grid: prevGrid
        }
      }
      return {grid: prevGrid}
    })

    

    this.setState(({next}) => ({
      next: next==="X" ? "O" : "X"
    }))

    
  }

  validate(){
    console.log('inside validate')
    if(
      (this.state.grid[0][0]!=='' && this.state.grid[0][0]===this.state.grid[0][1] && this.state.grid[0][1]===this.state.grid[0][2]) || 
      (this.state.grid[1][0]!=='' && this.state.grid[1][0]===this.state.grid[1][1] && this.state.grid[1][1]===this.state.grid[1][2]) ||
      (this.state.grid[2][0]!=='' && this.state.grid[2][0]===this.state.grid[2][1] && this.state.grid[2][1]===this.state.grid[2][2]) ||
      
      (this.state.grid[0][0]!=='' && this.state.grid[0][0]===this.state.grid[1][0] && this.state.grid[1][0]===this.state.grid[2][0]) ||
      (this.state.grid[0][1]!=='' && this.state.grid[0][1]===this.state.grid[1][1] && this.state.grid[1][1]===this.state.grid[2][1]) ||
      (this.state.grid[0][2]!=='' && this.state.grid[0][2]===this.state.grid[1][2] && this.state.grid[1][2]===this.state.grid[2][2]) ||
      
      (this.state.grid[0][0]!=='' && this.state.grid[0][0]===this.state.grid[1][1] && this.state.grid[1][1]===this.state.grid[2][2]) ||
      (this.state.grid[0][2]!=='' && this.state.grid[0][2]===this.state.grid[1][1] && this.state.grid[1][1]===this.state.grid[2][0]) 
    ){
        return true
    }
  }
  
  reset(){
    //console.log('before ',this.state.grid)
    this.setState((state)=>{
      
      state.grid = [['','',''],['','',''],['','','']]
      state.next = 'X'
      state.msg =  ''
      //console.log('after ',state.grid) //works
      return state
    })
    //window.location.reload(false)
  }

  render() {
    return (
      <div>
        <div className="box">
        <div className="row">
          <Square row="0" col="0" {...this.state} parentClick={this.parentClick}/>
          <Square row="0" col="1" {...this.state} parentClick={this.parentClick}/>
          <Square row="0" col="2" {...this.state} parentClick={this.parentClick}/>
        </div>
        <div className="row">
          <Square row="1" col="0" {...this.state} parentClick={this.parentClick}/>
          <Square row="1" col="1" {...this.state} parentClick={this.parentClick}/>
          <Square row="1" col="2" {...this.state} parentClick={this.parentClick}/>
        </div>
        <div className="row">
          <Square row="2" col="0" {...this.state} parentClick={this.parentClick}/>
          <Square row="2" col="1" {...this.state} parentClick={this.parentClick}/>
          <Square row="2" col="2" {...this.state} parentClick={this.parentClick}/>
        </div>
      </div>
      <div className="msg">{this.state.msg}</div>
      <div className="reset"><button onClick={this.reset}>Reset</button></div>
      </div>
      
    );
  }
}

class Square extends Component {
  constructor(props) {
    super(props);
    this.squareClick = this.squareClick.bind(this);
    
  }
  
  squareClick(e) {
    if(this.props.msg===''){ //if no one has won yet
      if(this.props.grid[this.props.row][this.props.col]===''){ //only if this is an unplayed square
        this.props.parentClick(e);
        this.setState({
          text: this.props.next
        })
      }
    }
    
  }

  render() {
    return(
    <div row={this.props.row} col={this.props.col} className="square" onClick={this.squareClick}>
      {/* {this.state.text} */}
      {this.props.grid[this.props.row][this.props.col]}
    </div>
    );
  }
}

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <MyComponent />      
      </div>
    );
  }
}

export default App;
