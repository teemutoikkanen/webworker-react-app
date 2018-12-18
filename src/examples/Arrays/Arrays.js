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
      numArrays: 16,
      numElements: 500000,
      numDoneWorkers: 0,
      timeTaken: 0,
      storedArrays: [],
      numRequestedArrays: 16
    };

    this.sortArrays = this.sortArrays.bind(this);
  }


  sortArrays = () => {
    var worker = new Worker(arrayMaker);
    worker.postMessage({numArrays: this.state.numArrays, numElements: this.state.numElements});

    this.setState({
      storedArrays: [],
      numRequestedArrays: this.state.numArrays
    })

    worker.onmessage = function(e) {
      let storedArrays = this.state.storedArrays;
      storedArrays.push(e.data);
      this.setState({
        storedArrays: storedArrays
      });
      if (storedArrays.length == this.state.numRequestedArrays) {
        let t0 = performance.now();
        for (var i=0; i < storedArrays.length; i++) {
          storedArrays[i].sort();
        }
        let t1 = performance.now();
        this.setState({
          timeTaken: t1-t0
        });
      }
    }.bind(this)
  }

  setNumArrays = (event) => {
    this.setState({
      numArrays: parseInt(event.target.value)
    })
  }

  setNumElements = (event) => {
    this.setState({
      numElements: parseInt(event.target.value)
    })
  }

  setNumWorkers = (event) => {
    this.setState({
      numWorkers: parseInt(event.target.value)
    })
  }

  sortArraysWebWorkers = () => {

    this.setState({
      numDoneWorkers: 0,
      storedArrays: [],
      numRequestedArrays: this.state.numArrays
    });
    
    var arrayWorker = new Worker(arrayMaker);
    arrayWorker.postMessage({numArrays: this.state.numArrays, numElements: this.state.numElements});

    arrayWorker.onmessage = (e) => {
      let storedArrays = this.state.storedArrays;
      storedArrays.push(e.data);
      this.setState({
        storedArrays: storedArrays
      });
      if (storedArrays.length == this.state.numRequestedArrays) {

        let t0 = performance.now();

        // Actual worker creation / listening
        this.setState({
          workerDoneStates: Array(this.state.numWorkers).fill(0),
          numPerWorker: Math.floor(this.state.numArrays / this.state.numWorkers)
        });
        let numPerWorker = this.state.numPerWorker;

        for (var i=0; i < this.state.numWorkers; i++) {
          var worker = new Worker(worker_script);
          var arrSlice;
          if (i < this.state.numWorkers-1) {
            arrSlice = storedArrays.slice(i * numPerWorker, (i+1) * numPerWorker);
          }
          else {
            arrSlice = storedArrays.slice(i*numPerWorker);
          }
          worker.postMessage({id: i, arrays: arrSlice});

          worker.onmessage = (e) => {
            let idx = e.data.id;
            let currStatus = this.state.workerDoneStates;
            currStatus[idx] = currStatus[idx] + 1;
            this.setState({
              workerDoneStates: currStatus
            });
            if (currStatus[idx] == this.state.numPerWorker) {
              this.setState({
                numDoneWorkers: this.state.numDoneWorkers + 1
              })
              if (this.state.numDoneWorkers == this.state.numWorkers) {
                let t1 = performance.now();
                this.setState({
                  timeTaken: t1-t0
                })
              }
            }
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
          <input name="numwork" type="radio" value="3" />3
          <input name="numwork" type="radio" value="4" defaultChecked />4
          <input name="numwork" type="radio" value="5" />5
          <input name="numwork" type="radio" value="6" />6
          <input name="numwork" type="radio" value="7" />7
          <input name="numwork" type="radio" value="8" />8
          <input name="numwork" type="radio" value="9" />9
          <input name="numwork" type="radio" value="10" />10
          <input name="numwork" type="radio" value="11" />11
          <input name="numwork" type="radio" value="16" />16
        </div>
        <div onChange={this.setNumArrays}>
          <div>Number of arrays to sort</div>
          <input name="numarr" type="radio" value="16" defaultChecked />16
          <input name="numarr" type="radio" value="32" />32
          <input name="numarr" type="radio" value="64" />64
          <input name="numarr" type="radio" value="128" />128
        </div>
        <div onChange={this.setNumElements}>
          <div>Number of elements / array</div>
          <input name="numelem" type="radio" value="500000" defaultChecked />500,000
          <input name="numelem" type="radio" value="1000000" />1,000,000
          <input name="numelem" type="radio" value="2000000" />2,000,000
          <input name="numelem" type="radio" value="5000000" />5,000,000
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