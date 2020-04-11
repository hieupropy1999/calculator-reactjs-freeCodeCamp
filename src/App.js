import React, { Component } from 'react';
import './App.css';
const nums = [7, 8 ,9, 4, 5, 6, 1, 2, 3, 0];
const ops = ['/', '*','-','+', '='];
const ids = {
  7: "seven", 
  8: "eight" ,
  9: "nine", 
  4: "four", 
  5: "five", 
  6: "six", 
  1: "one", 
  2: "two", 
  3: "three", 
  0: "zero",
  '/': "divide", 
  '*': "multiply",
  '-': "subtract",
  '+': "add", 
  '=': "equals"
};
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      lastPressed: undefined,
      calc: '0',
    }
  }
  handleClick = (e) => {
    const {innerText} = e.target;
    const {lastPressed , calc} = this.state;
    this.setState({
      lastPressed:innerText
    });
    switch(innerText){
      case 'AC':
        this.setState({
          calc: '0'
        });
        break;
      case '=':
        // eslint-disable-next-line
        const evaluated = eval(calc);
        this.setState({
          calc : evaluated
        });
        break;
      case '.':
        const splitted = calc.split(/[\\+\\*\\-\\/]/);
        const last = splitted.slice(-1)[0]; //slice(-1) give array with 1 element so we need to get that element
        if(!last.includes('.')){
          this.setState({
            calc: calc + '.'
          });
        }
        break;
      case '-':
        if(lastPressed === '-'){
          return;
        }else{
          this.setState({
            calc: `${calc} ${innerText} `
          });
        }
        break;
      default:
        let ev = undefined;
        if(ops.includes(innerText)){
          if(lastPressed === '='){
            ev = `${calc} ${innerText} `;
          }
          else if(ops.includes(lastPressed) && ops.includes(innerText)){
            const lastIndex = this.findLastIndex(calc);
            ev = calc.slice(0, lastIndex + 1) + ` ${innerText} `;
          }else{
            ev = `${calc} ${innerText} `
          }
        }
        else{
          if(lastPressed === '='){
            this.setState({
              calc: innerText
            });
            return;
          }
          ev = calc === '0' ? innerText :  (calc + innerText);
        }       
        this.setState({
          calc: ev
        });        
    }  
  }
  findLastIndex(str){
    let newstr = str.split("").reverse();
    console.log(newstr);
    for(let i = 0; i < newstr.length; i++){
      if(newstr[i] !== " " && nums.includes(Number(newstr[i]))){
         // console.log(i);
         return newstr.length - i  -1;
      }
    }
    return -1;
  }
  render(){
    const {calc} = this.state;
    return (
     <div className="calculator">
        {/*<p style={{position:'absolute',top:0}}>{JSON.stringify(this.state)}</p> */}
        <div id="display" 
          className="display">
          {calc}
        </div>     
        <div className="nums-container">
          <button 
            className="button light-grey ac big-v"
            onClick={this.handleClick} id="clear">
            AC
          </button>
          {nums.map(num => 
                   <button 
                     key={num}
                     className={num !==0 ? "button dark-grey": "button dark-grey big-v"}
                     id={ids[num]}
                     onClick={this.handleClick}
                     >
                      {num}
                   </button>)}
          <button 
            className="button light-grey"
            onClick={this.handleClick} id="decimal">.</button>
        </div>
        <div className="ops-container">
          {ops.map(op => 
                  <button 
                    key={op}
                    className = "button orange"
                    id={ids[op]}
                    onClick={this.handleClick}
                    >
                     {op}
                   </button>)}
        </div>
          
      </div> 
    );
  }
}

export default App;
