import React from 'react';
import './App.css';

function Knob1(props) {
  const scale = props.scale || 1;
  const progress = props.progress || 1;
  const size = 120 * scale;
  const strokeWidth = 12 * scale;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference * (1 - progress);
  return (
    <svg
      width={size}
      height={size}
    >
      <circle
        r={radius}
        cx={size / 2}
        cy={size / 2}
        fill="transparent"
        stroke="white"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={dashoffset}
      />
    </svg>
  );
}

function App() {
  return (
    <div className="app">
      <header className="header">
        react-knobs-demo
      </header>
      <div className="knobs">
        <Knob1 progress={0.2} />
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

export default App;
