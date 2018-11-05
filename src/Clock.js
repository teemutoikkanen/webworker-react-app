import React, { Component } from "react";

class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
    };

    this.updateTime = this.updateTime.bind(this);
  }

  componentDidMount() {
    this.timer = window.setInterval( () => this.updateTime(), 1000 );
  }

  componentWillUnmount() {
    window.clearInterval(this.timer)
  }

  updateTime(event) {
    this.setState({
      time: new Date()
    });
  }

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", fontSize: "50px", margin: "0px 20px" }}>
        { this.state.time.toTimeString().substr(0, 8) }
      </div>
    );
  }
}

export default Clock;
