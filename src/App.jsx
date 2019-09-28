import React, { useState } from 'react';
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

export default function () {
  const [activeTab, setActiveTab] = useState('quick-demo');
  const [knobValues, setKnobValues] = useState(
    Array.from({ length: KNOB_PRESETS.length }, () => KNOB_INITIAL_VALUE)
  );

  const handleQuickDemoTabClick = () => setActiveTab('quick-demo');
  const handleCodeExamplesTabClick = () => setActiveTab('code-examples');
  const handleKnobProgressChange = (index, value) => {
    const newKnobValues = [...knobValues];
    newKnobValues[index] = value;
    setKnobValues(newKnobValues);
  };

  return (
    <div className="app">
      <header className="header">
        react-knobs-demo
      </header>
      <div className="main">
        <div className="tabs">
          <button
            className={classNames('tab-button', { 'active': activeTab === 'quick-demo' })}
            onClick={handleQuickDemoTabClick}
          >
            Quick Demo
          </button>
          <button
            className={classNames('tab-button', { 'active': activeTab === 'code-examples' })}
            onClick={handleCodeExamplesTabClick}
          >
            Code Examples
          </button>
        </div>
        <div className={classNames('knobs', { 'hidden': activeTab !== 'quick-demo' })}>
          {KNOB_PRESETS.map((preset, index) => (
            <BicolorKnob
              key={preset}
              preset={preset}
              scale={1}
              value={knobValues[index]}
              onChange={(value) => handleKnobProgressChange(index, value)}
            />
          ))}
        </div>
        <div className={classNames({ 'hidden': activeTab !== 'code-examples' })}>
          Code examples
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
