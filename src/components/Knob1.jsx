import React from 'react';

const unselectable = {
  '-webkit-user-select': 'none',
  '-moz-user-select': 'none',
  '-ms-user-select': 'none',
  'user-select': 'none',
};

export default class extends React.Component {
  render() {
    const scale = this.props.scale || 1;
    const progress = this.props.progress || 1;
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
          {Math.floor(progress * 100)}%
        </text>
      </svg>
    );
  }
}
