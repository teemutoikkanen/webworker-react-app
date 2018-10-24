import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {


  someSlowComputation() {

    var i;
    var j = 0;
    for (i = 0; i < 10000000000; i++) {
      j = j + i**2
    }

    return j


  }
  alertFunc() {
    window.alert("derp");

  }

  render() {
    return (
      <div className="App">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            React-logo rotating /w CSS.
          </p>


        <button onClick={this.someSlowComputation}>
          someHeavyComputation
        </button>

        <button onClick={this.alertFunc}>
          alertButton
        </button>


      </div>
    );
  }
}

export default App;
