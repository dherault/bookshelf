import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    foo: 'bar',
  }
  render() {
    return (
      <div className="App">
        hello world
        <pre>{JSON.stringify(this.props.items, null, 2)}</pre>
      </div>
    );
  }
}

export default App;
