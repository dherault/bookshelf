import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    modalOpened: false,
  };

  render() {
    const { modalOpened } = this.state;

    return (
      <div className="App">
        hello world
      </div>
    );
  }
}

export default App;
