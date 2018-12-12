import React, { Component } from "react";
import worker_script from './worker';
import arrayMaker from './arrayMaker';


const createRandArray = (n) => {
  return Array.from({length: n}, () => Math.random());
}

class Arrays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numWorkers: 4,
      numArrays: 200000,
      numElements: 10,
      numDoneWorkers: 0,
      timeTaken: 0
    };

    this.sortArrays = this.sortArrays.bind(this);
  }


  sortArrays = () => {
    var worker = new Worker(arrayMaker);
    worker.postMessage({numArrays: this.state.numArrays, numElements: this.state.numElements});

    worker.onmessage = function(e) {
      let t0 = performance.now();
      let parentArray = e.data;
      for (var i=0; i < parentArray.length; i++) {
        parentArray[i].sort();
      }
      let t1 = performance.now();
      this.setState({
        timeTaken: t1-t0
      });
    }.bind(this)
  }

  setNumArrays = (event) => {
    this.setState({
      numArrays: event.target.value
    })
  }

  setNumElements = (event) => {
    this.setState({
      numElements: event.target.value
    })
  }

  setNumWorkers = (event) => {
    this.setState({
      numWorkers: event.target.value
    })
  }

  sortArraysWebWorkers = () => {

    this.setState({
      numDoneWorkers: 0
    });
    
    var arrayWorker = new Worker(arrayMaker);
    arrayWorker.postMessage({numArrays: this.state.numArrays, numElements: this.state.numElements});

    arrayWorker.onmessage = (e) => {
      let parentArray = e.data;
      let t0 = performance.now();
      for (var i=0; i < this.state.numWorkers; i++) {
        var worker = new Worker(worker_script);
        var numPerWorker = Math.floor(this.state.numArrays / this.state.numWorkers);
        var arrSlice;
        if (i < this.state.numWorkers-1) {
          arrSlice = parentArray.slice(i * numPerWorker, (i+1) * numPerWorker);
        }
        else {
          arrSlice = parentArray.slice(i*numPerWorker);
        }
        worker.postMessage(arrSlice);

        worker.onmessage = (e) => {
          this.setState({
            numDoneWorkers: this.state.numDoneWorkers + 1
          })
          if (this.state.numDoneWorkers === parseInt(this.state.numWorkers)) {
            let t1 = performance.now();
            this.setState({
              timeTaken: t1-t0
            })
          }
        }
      }

    }


  }

  render() {
    return (
      <div>
        <div onChange={this.setNumWorkers}>
          <div>Number of workers</div>
          <input name="numwork" type="radio" value="1" />1
          <input name="numwork" type="radio" value="2" />2
          <input name="numwork" type="radio" value="4" defaultChecked />4
          <input name="numwork" type="radio" value="8" />8
          <input name="numwork" type="radio" value="16" />16
        </div>
        <div onChange={this.setNumArrays}>
          <div>Number of arrays to sort</div>
          <input name="numarr" type="radio" value="200000" defaultChecked />200,000
          <input name="numarr" type="radio" value="500000" />500,000
          <input name="numarr" type="radio" value="1000000" />1,000,000
        </div>
        <div onChange={this.setNumElements}>
          <div>Number of elements / array</div>
          <input name="numelem" type="radio" value="10" defaultChecked />10
          <input name="numelem" type="radio" value="30" />30
          <input name="numelem" type="radio" value="50" />50
        </div>
        <button onClick={this.sortArrays}>Sort in main thread</button>
        <button onClick={this.sortArraysWebWorkers}>Sort in web workers</button>
        <div>
          Workers done: {this.state.numDoneWorkers}/{this.state.numWorkers}
        </div>
        <div>
          Time taken: {this.state.timeTaken}ms
        </div>
      </div>
    )
  }

}

export default Arrays;