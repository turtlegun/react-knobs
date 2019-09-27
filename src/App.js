import React from 'react';
import classNames from 'classnames';

import BicolorKnob from './components/BicolorKnob';
import './App.css';

const KNOB_INITIAL_VALUE = 0.15;

const KNOB_PRESETS = [
  'fullon-butt',
  'fullon-round',
  'midlane-butt',
  'midlane-round',
  'concentric',
  'blindfold',
];

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'quick-demo',
      knobValues: Array.from({ length: KNOB_PRESETS.length }, () => KNOB_INITIAL_VALUE),
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
  handleKnobProgressChange = (index, value) => {
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
            {KNOB_PRESETS.map((preset, index) => (
              <BicolorKnob
                preset={preset}
                scale={1}
                value={this.state.knobValues[index]}
                onChange={(value) => this.handleKnobProgressChange(index, value)}
              />
            ))}
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
