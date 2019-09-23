import React from 'react';
import Knob1 from './components/Knob1';
import './App.css';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      knob1Progress: 0.15,
    };
  }
  handleKnob1ProgressChange = (progress) => {
    this.setState({
      knob1Progress: progress,
    })
  }
  render() {
    return (
      <div className="app">
        <header className="header">
          react-knobs-demo
      </header>
        <div className="knobs">
          <Knob1
            scale={1}
            progress={this.state.knob1Progress}
            onProgressChange={this.handleKnob1ProgressChange}
          />
        </div>
        <div className="themes">
          themes
      </div>
        <footer className="footer">
          Andrii Polishchuk, 2019
      </footer>
      </div>
    );
  }
}
