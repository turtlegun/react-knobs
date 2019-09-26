import React from 'react';

const unselectable = {
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
};

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      dragStartValue: 0,
      dragStartX: 0,
      dragStartY: 0,
    };
  }
  componentDidMount() {
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMouseMove);
  }
  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
  }
  handleMouseDown = (event) => {
    document.body.style.cursor = 'none';
    this.setState({
      isDragging: true,
      dragStartValue: this.props.value,
      dragStartX: event.pageX,
      dragStartY: event.pageY,
    });
  }
  handleMouseUp = (_event) => {
    document.body.style.cursor = 'default';
    this.setState({
      isDragging: false
    });
  }
  handleMouseMove = (event) => {
    if (this.state.isDragging && this.props.onChange) {
      const pivot = this.state.dragStartValue * 60;
      const pad = 60 - pivot;
      const newValue = (pivot + Math.max(-pivot, Math.min(pad, this.state.dragStartY - event.pageY))) / 60;
      this.props.onChange(newValue);
    }
  }
  render() {
    const scale = this.props.scale == null ? 1 : this.props.scale;
    const value = this.props.value == null ? 1 : this.props.value;
    const size = 120 * scale;
    const strokeWidth = 12 * scale;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const dashoffset = circumference * (1 - value * 0.75);
    const center = size / 2;
    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        onMouseDown={this.handleMouseDown}
      >
        <circle
          r={radius}
          cx={center}
          cy={center}
          fill="transparent"
          stroke="grey"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.25}
          transform={`rotate(135 ${center} ${center})`}
        />
        <circle
          r={radius}
          cx={center}
          cy={center}
          fill="transparent"
          stroke="white"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          transform={`rotate(135 ${center} ${center})`}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          style={{ ...unselectable }}
        >
          {Math.floor(value * 100)}%
        </text>
      </svg>
    );
  }
}
