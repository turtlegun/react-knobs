import React from 'react';
import './App.css';

const unselectable = {
  '-webkit-user-select': 'none',
  '-moz-user-select': 'none',
  '-ms-user-select': 'none',
  'user-select': 'none',
};

function Knob1(props) {
  const scale = props.scale || 1;
  const progress = props.progress || 1;
  const size = 120 * scale;
  const strokeWidth = 12 * scale;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference * (1 - progress * 0.75);
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <circle
        r={radius}
        cx={size / 2}
        cy={size / 2}
        fill="transparent"
        stroke="grey"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={circumference * 0.25}
        transform={`rotate(135 ${size / 2} ${size / 2})`}
      />
      <circle
        r={radius}
        cx={size / 2}
        cy={size / 2}
        fill="transparent"
        stroke="white"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={dashoffset}
        transform={`rotate(135 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        style={{ ...unselectable }}
      >
        {Math.floor(props.progress * 100)}%
      </text>
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
        <Knob1 scale={1} progress={0.75} />
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
