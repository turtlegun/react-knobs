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
    const formatter = this.props.formatter || ((value) => Math.floor(value * 100) + '%');
    const scale = this.props.scale == null ? 1 : this.props.scale;
    const value = this.props.value == null ? 1 : this.props.value;
    const size = 120 * scale;
    const center = size / 2;
    let strokeLinecap = "none";
    const w1 = 12 * scale;
    const r1 = size / 2 - w1 / 2;
    const c1 = 2 * Math.PI * r1;
    let w2 = 0;
    let r2 = 0;
    let c2 = 0;
    switch (this.props.preset) {
      case 'fullon-butt':
        w2 = w1;
        r2 = r1;
        c2 = c1;
        strokeLinecap = this.props.strokeLinecap || "butt";
        break;
      case 'fullon-round':
        w2 = w1;
        r2 = r1;
        c2 = c1;
        strokeLinecap = this.props.strokeLinecap || "round";
        break;
      case 'midlane-butt':
        w2 = w1 * 0.5;
        r2 = r1;
        c2 = c1;
        strokeLinecap = this.props.strokeLinecap || "butt";
        break;
      case 'midlane-round':
        w2 = w1 * 0.5;
        r2 = r1;
        c2 = c1;
        strokeLinecap = this.props.strokeLinecap || "round";
        break;
      case 'concentric':
        w2 = w1 * 0.5;
        r2 = r1 + w1 * 0.25;
        c2 = 2 * Math.PI * r2;
        strokeLinecap = this.props.strokeLinecap || "butt";
        break;
      case 'blindfold':
        w2 = w1 * 0.5;
        r2 = r1 + w1 * 0.5;
        c2 = 2 * Math.PI * r2;
        strokeLinecap = this.props.strokeLinecap || "round";
        break;
    }
    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        onMouseDown={this.handleMouseDown}
        style={{ ...unselectable }}
      >
        <circle
          r={r1}
          cx={center}
          cy={center}
          fill="transparent"
          stroke="black"
          strokeWidth={w1}
          strokeLinecap={strokeLinecap}
          strokeDasharray={c1}
          strokeDashoffset={c1 * 0.25}
          transform={`rotate(135 ${center} ${center})`}
        />
        <circle
          r={r2}
          cx={center}
          cy={center}
          fill="transparent"
          stroke="#3FA9F5"
          strokeWidth={w2}
          strokeLinecap={strokeLinecap}
          strokeDasharray={c2}
          strokeDashoffset={c2 * (1 - value * 0.75)}
          transform={`rotate(135 ${center} ${center})`}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {formatter(value)}
        </text>
      </svg>
    );
  }
}
