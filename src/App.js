import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import worker_script from './worker';
import Clock from './Clock.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation1: true,
      animation2: true,
      PiCount: 30000000,
      PiResult: 0,
      timeTaken: 0
    };

    this.toggleAnimation1 = this.toggleAnimation1.bind(this);
    this.toggleAnimation2 = this.toggleAnimation2.bind(this);
    this.monteCarloPi = this.monteCarloPi.bind(this);
    this.handlePiIterationChange = this.handlePiIterationChange.bind(this);
    this.estimatePi = this.estimatePi.bind(this);
    this.webWorkerTest = this.webWorkerTest.bind(this);
  }

  estimatePi() {
    let t0 = performance.now();
    this.monteCarloPi();
    let t1 = performance.now();

    this.setState({
      timeTaken: (t1 - t0).toFixed(1)
    });
  }

  monteCarloPi() {
    var inside = 0;
    let count = this.state.PiCount;
    for (var i = 0; i < count; i++) {
      var x = Math.random() * 2 - 1;
      var y = Math.random() * 2 - 1;
      if (x * x + y * y < 1) {
        inside++;
      }
    }

    let result = (4.0 * inside) / count;

    this.setState({
      PiResult: result
    });
  }

  alertFunc() {
    window.alert("Hi");
  }

  toggleAnimation1() {
    this.setState({
      animation1: !this.state.animation1
    });
  }
  toggleAnimation2() {
    this.setState({
      animation2: !this.state.animation2
    });
  }

  handlePiIterationChange(event) {
    this.setState({
      PiCount: event.target.value
    });
  }

  webWorkerTest() {

    if (window.Worker) {

      const t0 = performance.now();

      var myWorker = new Worker(worker_script);
      myWorker.postMessage(this.state.PiCount);

      
	    myWorker.onmessage = function(e) {
      console.log('Message received from worker');
      
      this.setState({
        PiResult: e.data,
      });

      const t1 = performance.now();

      this.setState({
        timeTaken: (t1 - t0).toFixed(1),
      })




	    }.bind(this);
    }
    

  }

  render() {
    return (
      <div className="App">
        <div style={{display: "flex", flexDirection: "row", maxHeight: "300px"}}>
          <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <button onClick={this.alertFunc}>Window.alert('Hi') Example</button>
          </div>
          <Clock />
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <img
              src={logo}
              className={this.state.animation1 ? "App-logo" : "App-logo-paused"}
              alt="logo"
              onClick={this.toggleAnimation1}
            />
            <p className="logo-text">
              CSS transform: rotate()
            </p>
          </div>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <img
              src={logo}
              className={this.state.animation2 ? "App-logo2" : "App-logo2-paused"}
              alt="logo"
              onClick={this.toggleAnimation2}
            />
            <p className="logo2-text">CSS margin-left()</p>
          </div>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <img
              src={'https://i.redd.it/ounq1mw5kdxy.gif'}
              alt="gif"
            />
            <p className="logo2-text">GIF</p>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <b>Monte Carlo PI Simulator</b>
          <form>
        
            <label>
            number of iterations: 
              <input
                type="text"
                name="i"
                onChange={this.handlePiIterationChange}
              />
            </label>
          </form>
          <button onClick={this.estimatePi}>Run in main thread</button>
          <button onClick={this.webWorkerTest}>Run in a web worker</button>

          <p>
            PI SIM last result: {this.state.PiResult}. Time it took:{" "}
            {this.state.timeTaken} ms
          </p>

    
          <p className="notes">
            Real PI:
            3.1415926535897932384626433832795028841971693993751058209749445923078
          </p>
          <p className="notes"> i: {this.state.PiCount}</p>
        </div>
      </div>
    );
  }
}

export default App;
