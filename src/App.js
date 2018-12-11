import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Clock from './Clock.js'
import MonteCarlo from './examples/MonteCarlo/MonteCarlo.js'
import TabTest from './examples/TabTest/TabTest.js'

var that;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animation1: true,
      animation2: true,
      selectedExampleIdx: 0
    };

    that = this;

    this.examples = [
      { label: "Monte Carlo", component: MonteCarlo },
      { label: "Tab test", component: TabTest }
    ]
  }

  toggleAnimation() {
    this.setState({
      animation: !this.state.animation
    });
  }

  Example() {
    console.log(that.state.selectedExampleIdx)
    const SelectedExample = that.examples[that.state.selectedExampleIdx].component;
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
        <div style={{display: "flex", flexDirection: "row", maxHeight: "250px"}}>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <img
              src={logo}
              className={this.state.animation1 ? "App-logo" : "App-logo-paused"}
              alt="logo"
              onClick={this.toggleAnimation1}
            />
            <p className="logo-text">
              CSS margin-left
            </p>
          </div>
          <Clock />
          <div style={{display: "flex", flex: 1, flexDirection: "column", alignItems: "center"}}>
            <img
              src={'https://i.redd.it/ounq1mw5kdxy.gif'}
              alt="gif"
            />
            <p className="logo2-text">GIF</p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "start", borderBottom: '1px solid white' }}>
          {
            this.examples.map((e, idx) => {
              return <div className={ 'tab ' + (idx === this.state.selectedExampleIdx ? 'selectedTab' : '')} onClick={() => this.selectExample(idx)} key={e.label}>{e.label}</div>
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
