import React from 'react';
import classNames from 'classnames';

import BicolorKnob from './components/BicolorKnob';
import './App.css';

// const knobDescriptions = {
//   'preset': 'fullon-butt'
// };

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'quick-demo',
      knobValues: [0.15, 0.15, 0.15, 0.15, 0.15, 0.15],
    };
  }
  handleQuickDemoTabClick = () => {
    this.setState({
      activeTab: 'quick-demo',
    });
  }
  handleCodeExamplesTabClick = () => {
    this.setState({
      activeTab: 'code-examples',
    });
  }
  handleKnobProgressChange = (index) => (value) => {
    const newKnobValues = [...this.state.knobValues];
    newKnobValues[index] = value;
    this.setState({
      knobValues: newKnobValues,
    })
  }
  render() {
    return (
      <div className="app">
        <header className="header">
          react-knobs-demo
      </header>
        <div className="main">
          <div className="tabs">
            <button
              className={classNames('tab-button', { 'active': this.state.activeTab == 'quick-demo' })}
              onClick={this.handleQuickDemoTabClick}
            >
              Quick Demo
            </button>
            <button
              className={classNames('tab-button', { 'active': this.state.activeTab == 'code-examples' })}
              onClick={this.handleCodeExamplesTabClick}
            >
              Code Examples
            </button>
          </div>
          <div className={classNames('knobs', { 'hidden': this.state.activeTab != 'quick-demo' })}>
            <BicolorKnob
              preset="fullon-butt"
              scale={1}
              value={this.state.knobValues[0]}
              onChange={this.handleKnobProgressChange(0)}
            />
            <BicolorKnob
              preset="fullon-round"
              scale={1}
              value={this.state.knobValues[1]}
              onChange={this.handleKnobProgressChange(1)}
            />
            <BicolorKnob
              preset="midlane-butt"
              scale={1}
              value={this.state.knobValues[2]}
              onChange={this.handleKnobProgressChange(2)}
            />
            <BicolorKnob
              preset="midlane-round"
              scale={1}
              value={this.state.knobValues[3]}
              onChange={this.handleKnobProgressChange(3)}
            />
            <BicolorKnob
              preset="concentric"
              scale={1}
              value={this.state.knobValues[4]}
              onChange={this.handleKnobProgressChange(4)}
            />
            <BicolorKnob
              preset="blindfold"
              scale={1}
              value={this.state.knobValues[5]}
              onChange={this.handleKnobProgressChange(5)}
            />
          </div>
          <div className={classNames({ 'hidden': this.state.activeTab != 'code-examples' })}>
            234234
          </div>
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
