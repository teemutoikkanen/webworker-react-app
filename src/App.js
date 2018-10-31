import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo1className: 'App-logo',
      logo2className: 'App-logo2',
      PiCount: 1000000,
      PiResult: 0,
      PiCalculating: false,
      timeTaken: 0

    }

    this.toggleAnimation1 = this.toggleAnimation1.bind(this);
    this.toggleAnimation2 = this.toggleAnimation2.bind(this);
    this.monteCarloPi = this.monteCarloPi.bind(this);
    this.handlePiIterationChange = this.handlePiIterationChange.bind(this);
    this.estimatePi = this.estimatePi.bind(this);
  }


  estimatePi() {

    let t0 = performance.now();
    this.monteCarloPi();
    let t1 = performance.now();

    this.setState({
      timeTaken: (t1-t0)
    })


  }
  
  monteCarloPi() {

    //setState "currently working"

    this.setState({
      PiCalculating: true
    })

    var inside = 0;
    let count = this.state.PiCount
    for (var i = 0; i < count; i++) {
        var x = Math.random()*2-1;
        var y = Math.random()*2-1;
        if ((x*x + y*y) < 1) {
            inside++
        }
    }

    let result =  4.0 * inside / count;

    this.setState({
      PiResult: result,
    })

    //setState "done"
    this.setState({
      PiCalculating: false
    })
    
  }

  alertFunc() {
    window.alert("Hi");
  }

  toggleAnimation1() {
    console.log("toggleanim");
    
    if (this.state.logo1className === 'App-logo') {
      this.setState({
        logo1className: 'App-logo-paused'
      });
    }
    else if (this.state.logo1className === 'App-logo-paused') {
      this.setState({
        logo1className: 'App-logo'
      });
    }
  }
  toggleAnimation2() {
    console.log("toggleanim");
    
    if (this.state.logo2className === 'App-logo2') {
      this.setState({
        logo2className: 'App-logo2-paused'
      });
    }
    else if (this.state.logo2className === 'App-logo2-paused') {
      this.setState({
        logo2className: 'App-logo2'
      });
    }
  }

  handlePiIterationChange(event) {
    this.setState({
      PiCount: event.target.value
    });
  }


  render() {
    return (
      <div className="App">
        <button onClick={this.alertFunc}>Window.alert('Hi') Example</button>
        <img src={logo} className={this.state.logo1className} alt="logo" onClick={this.toggleAnimation1}/>
        <p className='logo-text'>React-logo rotating with CSS transform: rotate().</p>
        <img src={logo} className={this.state.logo2className} alt="logo" onClick={this.toggleAnimation2}/>
        <p className='logo2-text'>React-logo sliding with CSS margin-left().</p>
        
        <form>
          <label>
            PI SIM number of iterations: 
            <input type="text" name="i" onChange = {this.handlePiIterationChange} />
          </label>
        </form>
        <button onClick={this.estimatePi}>Estimate Pi!</button>

        <p> PI SIM last result: {this.state.PiResult}. Time it took: {this.state.timeTaken} ms</p>
         <p className='notes'> Real PI: 3.1415926535897932384626433832795028841971693993751058209749445923078</p>
         <p className='notes'> i: {this.state.PiCount}</p>

      </div>
    );
  }
}

export default App;
