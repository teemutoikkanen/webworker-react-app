import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Clock from './Clock.js'
import MonteCarlo from './examples/MonteCarlo/MonteCarlo.js'
import TabTest from './examples/TabTest/TabTest.js'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animation1: true,
      animation2: true,
      selectedExampleIdx: 0
    };

    this.examples = [
      { label: "Monte Carlo", component: MonteCarlo },
      { label: "Tab test", component: TabTest }
    ]

    this.toggleAnimation1 = this.toggleAnimation1.bind(this);
    this.toggleAnimation2 = this.toggleAnimation2.bind(this);
    this.Example = this.Example.bind(this)
    this.selectExample = this.selectExample.bind(this)
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

  Example() {
    console.log(this.state.selectedExampleIdx)
    const SelectedExample = this.examples[this.state.selectedExampleIdx].component;
    return <SelectedExample />
  }

  selectExample(idx) {
    this.setState({
      selectedExampleIdx: idx
    })
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
        <div style={{ display: "flex", flexDirection: "row" }}>
          {
            this.examples.map((e, idx) => {
              return <button onClick={() => this.selectExample(idx)} key={e.label}>{e.label}</button>
            })
          }
        </div>
        <span></span>
        <div style={{ marginTop: "20px" }}>
          <this.Example/>
        </div>
      </div>
    );
  }
}

export default App;
