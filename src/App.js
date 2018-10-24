import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  someSlowComputation() {
    var i;
    var j = 0;
    var n = 10000000000;
    for (i = 0; i < n; i++) {
      j = j + i ** 2;
    }
  }

  alertFunc() {
    window.alert("alert");
  }

  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        React-logo rotating with CSS transform: rotate().
        <img src={logo} className="App-logo2" alt="logo" />
        React-logo sliding with CSS margin-left().

        <button onClick={this.someSlowComputation}>someSlowComputation</button>
        <button onClick={this.alertFunc}>alertButton</button>
      </div>
    );
  }
}

export default App;
