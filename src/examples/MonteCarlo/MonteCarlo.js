import React, { Component } from "react";
import worker_script from './worker';
import plot from "./plot.png";

class MonteCarlo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
      PiIterations: 10000000,
      PiResultMainThread: 0,
      PiTimeTakenMainThread: 0,
      PiCorrectDigitsMainThread: 0,
      // PiResultWebWorker: 0,
      // PiTimeTakenWebWorker: 0,
      // PiCorrectDigitsWebWorker: 0,
      nWorkers: 4,
      nWorkersResults: [],
      nWorkersFinalResult: 0,
      nWorkersCorrectDigits: 0,
      nWorkersT0: 0,
      nWorkersTime: 0,
      coordArray: [],
    };


    this.monteCarloPi = this.monteCarloPi.bind(this);
    this.handlePiIterationChange = this.handlePiIterationChange.bind(this);
    this.estimatePi = this.estimatePi.bind(this);
    this.webWorkerTest = this.webWorkerTest.bind(this);
  }


  webWorkerTest() {
    if (window.Worker) {
      const t0 = performance.now();

      var myWorker = new Worker(worker_script);
      myWorker.postMessage(this.state.PiIterations);

      myWorker.onmessage = function(e) {
        console.log("Message received from worker");
        this.setState({
          PiResultWebWorker: e.data
        });

        const t1 = performance.now();
        const accuracy = this.nDecimalsCorrect(e.data.toString());

        this.setState({
          PiTimeTakenWebWorker: (t1 - t0).toFixed(1),
          PiCorrectDigitsWebWorker: accuracy
        });
      }.bind(this);
    }
  }

  setPiIterations = event => {
    this.setState({
      PiIterations: parseInt(event.target.value),
    });
  };

  componentDidUpdate(prevProps, prevState) {
    //todo time multiple workers: siis aina kun nWorkers.length == nWorkers -> tallenna nWorkersFinalResult
    // console.log("ComponentDidUpdate() " + this.state.nWorkersResults.length + " and " + this.state.nWorkers )


    //aina kun resultteja tullut lisää ja niitä oikea määrä nWorkers, ts. kun kaikki workerit on tehny duuninsa
    if (prevState.nWorkersResults !== this.state.nWorkersResults && this.state.nWorkersResults.length === parseInt(this.state.nWorkers)) {
      // console.log("results muuttu JA length: " + this.state.nWorkers)
      let nWorkersResults = this.state.nWorkersResults;
      let t1 = performance.now();
      let t0 = this.state.nWorkersT0;


      
      const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

      let finalResults = average(nWorkersResults);

      console.log("time", (t1 - t0).toFixed(1))
      this.setState({
        nWorkersFinalResult: finalResults,
        nWorkersCorrectDigits: this.nDecimalsCorrect(finalResults.toString()),
        nWorkersTime: (t1 - t0).toFixed(1)
      })
    }
   

    if (prevState.nWorkersResults.length === prevState.nWorkers) {
      console.log("nWorkers==nWorkersresults.length");
    }


  }


  estimatePi() {
    let t0 = performance.now();
    const result = this.monteCarloPi();
    let t1 = performance.now();

    const accuracy = this.nDecimalsCorrect(result.toString());

    this.setState({
      PiTimeTakenMainThread: (t1 - t0).toFixed(1),
      PiResultMainThread: result,
      PiCorrectDigitsMainThread: accuracy
    });
  }


  // randomTest = () => {
  //   return Math.random();
  // }

  monteCarloPi() {
    let inside = 0;
    let count = this.state.PiIterations;
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      if (x * x + y * y < 1) {
        inside++;
      }
    }

    let result = (4.0 * inside) / count;

    return result;
  }


  handlePiIterationChange(event) {
    this.setState({
      PiCount: event.target.value
    });
  }

setNWorkers = event => {
    this.setState({
      nWorkers: event.target.value
    })
  }

  //input pi estimate as a str. output: number of correct decimal
  nDecimalsCorrect = data => {
    const pi =
      "3.1415926535897932384626433832795028841971693993751058209749445923078";
    let count = 0;

    console.log("ndecimal data: " + data);

    for (let i = 2; i < data.length; i++) {
      if (data[i] === pi[i]) {
        count++;
      } else {
        break;
      }
    }

    return count;
  };


  handleMultipleWebWorkers = () => {

    

    const t0 = performance.now();
    let nWorkers = this.state.nWorkers;
    let PiIterations = this.state.PiIterations;
    let iPerWorker = PiIterations/nWorkers;

    // let results = []

    //vanhat pois
    this.setState({
      nWorkersResults: [],
      nWorkersT0: t0
    });


    let i = 0;
    for (i = 0; i < nWorkers; i++) {
      console.log("new worker number: " + (i+1) + " iPerWorker ", + iPerWorker);
      var myWorker = new Worker(worker_script);
      myWorker.postMessage(iPerWorker);

      myWorker.onmessage = function(e) {
        console.log("Message received from worker");

        if (e.data.x) {
          // console.log(e.data.x, " ", e.data.y);
          this.setState(prevState => ({
            coordArray: [...this.state.coordArray, e.data]
          }))

        }
        else {
          this.setState(prevState => ({
            nWorkersResults: [...this.state.nWorkersResults, e.data]
          }))
          
        }

        
      }.bind(this)
    
    }
  }


  dpquickTest = () => {

    function dpquick(data, from, to) {
      var length = to - from,
        temp,
        leftPivot,
        rightPivot,
        leftPivotValue,
        rightPivotValue,
        i,
        j;
      if (length <= 1) {
        return;
      }
      if (length < 17) {
        for (i = from + 1; i <= to; i++) {
          for (j = i; j > from && data[j] < data[j - 1]; j--) {
            temp = data[j - 1];
            data[j - 1] = data[j];
            data[j] = temp;
          }
        }
        return;
      }
      leftPivot = from;
      rightPivot = to;
      if (data[leftPivot] > data[rightPivot]) {
        temp = data[rightPivot];
        data[rightPivot] = data[leftPivot];
        data[leftPivot] = temp;
      }
      leftPivotValue = data[leftPivot];
      rightPivotValue = data[rightPivot];
      i = leftPivot + 1;
      while (i < rightPivot) {
        if (data[i] > rightPivotValue) {
          temp = data[i];
          rightPivot--;
          data[i] = data[rightPivot];
          data[rightPivot] = temp;
        } else {
          if (data[i] < leftPivotValue) {
            temp = data[i];
            leftPivot++;
            data[i] = data[leftPivot];
            data[leftPivot] = temp;
          }
          i++;
        }
      }
      temp = data[leftPivot];
      data[leftPivot] = data[from];
      data[from] = temp;
      temp = data[rightPivot];
      data[rightPivot] = data[to];
      data[to] = temp;
      dpquick(data, from, leftPivot);
      dpquick(data, leftPivot + 1, rightPivot - 1);
      dpquick(data, rightPivot, to);
    }

    function sample(size) {
      var items = [];
    
      for (var i = 0; i < size; i++) {
        items.push(Math.round(Math.random() * size));
      }
    
      return items;
    }

    let sample0 = sample(500000*16);
    let t0 = performance.now();
    dpquick(sample0, 0, sample0.length-1 )
    let t1 = performance.now();

    console.log(t1-t0)

    // return "dpquick time: " + t1-t0;

  }

  render() {
    return (
      <div className="flexColumn">
        <b>Monte Carlo PI Simulator</b>
        
        <div
          className="radio-buttons-montecarlo"
          onChange={this.setPiIterations}
        >
          number of iterations:
          <input type="radio" value="10000000" defaultChecked name="iterations" />
          10M
          <input type="radio" value="50000000" name="iterations" />
          50M
          <input type="radio" value="100000000" name="iterations" />
          100M
          <input type="radio" value="500000000" name="iterations" />
          500M
          <input type="radio" value="1000000000" name="iterations" />
          1000M
        </div>
        <hr/>

        <div className="montecarlo-main-thread">
          <button onClick={this.estimatePi}>Run in main thread</button>
        </div>
        <p>Result: {this.state.PiResultMainThread}</p>
        <p>Correct decimals: {this.state.PiCorrectDigitsMainThread}</p>
        <p>Time taken: {this.state.PiTimeTakenMainThread} ms</p>
        <hr/>

        {/* <div className="montecarlo-web-worker">
          <button onClick={this.webWorkerTest}>Run in a web worker</button>
        </div>
        <p>Result: {this.state.PiResultWebWorker}</p>
        <p>Correct decimals: {this.state.PiCorrectDigitsWebWorker}</p>
        <p>Time taken: {this.state.PiTimeTakenWebWorker} ms</p>
        <hr/> */}
        <div
          className="radio-buttons-multiple-workers"
          onChange={this.setNWorkers}
        >
          number of web workers:
          <input type="radio" value="1" name="workers" />
          1
          <input type="radio" value="2" name="workers" />
          2
          <input type="radio" value="3" name="workers" />
          3
          <input type="radio" value="4" defaultChecked name="workers" />
          4
          <input type="radio" value="5" name="workers" />
          5
          <input type="radio" value="6" name="workers" />
          6
          <input type="radio" value="7" name="workers" />
          7
          <input type="radio" value="8" name="workers" />
          8
          <input type="radio" value="9" name="workers" />
          9
          <input type="radio" value="10" name="workers" />
          10
          <input type="radio" value="11" name="workers" />
          11
          <input type="radio" value="12" name="workers" />
          12
          <input type="radio" value="13" name="workers" />
          13
          <input type="radio" value="16" name="workers" />
          16
        </div>
        <div className="montecarlo-multiple-workers">
          <button onClick={this.handleMultipleWebWorkers}>Run with {this.state.nWorkers} web workers</button>
        </div>
        <p>Result: {this.state.nWorkersFinalResult}</p>
        <p>Correct decimals: {this.state.nWorkersCorrectDigits}</p>
        <p>Time taken: {this.state.nWorkersTime} ms</p>





         <hr/>
        <p className="notes">
          Real PI:
          3.1415926535897932384626433832795028841971693993751058209749445923078
          <br/>
          navigator.hardwareConcurrency: {navigator.hardwareConcurrency}
          <br/>
          {/* {this.dpquickTest()} */}
        </p>
{/*         
        <p className="notes"> i: {this.state.PiIterations}</p>
        <p className="notes"> nWorkers: {this.state.nWorkers}</p>
        <ul className="notes">{this.state.nWorkersResults}</ul> */}

        {/* <img src={plot}></img> */}

        {/* <div className='unit-circle'>
          <svg viewBox = '0 0 200 200' width="500" length="500">
          <rect width="200" height="200" fill = "#282c34" stroke-width="1" stroke="rgb(0,0,0)" />
          <circle cx="100" cy="100" r="100" stroke="black" fill='#282c34' />
          {this.state.coordArray.length > 0 && this.state.coordArray.map((coord) => (
            <circle cx={coord.x*200} cy={coord.y*200} r="1" stroke="green" fill="green" />
          ))}
          </svg>
        </div> */}
        

      </div>
    );
  }
}

export default MonteCarlo;