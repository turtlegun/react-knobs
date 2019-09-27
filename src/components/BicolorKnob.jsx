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
    const knobContourWidth = 12 * scale;
    const knobRadius = size / 2 - knobContourWidth / 2;
    const knobContourCircumference = 2 * Math.PI * knobRadius;
    let valueLineWidth = 0;
    let valueLineRadius = 0;
    let valueContourCircumference = 0;
    let fillColor = 'red';
    let textColor = 'red';
    let handColor = 'red';
    let strokeLinecap = 'none';
    switch (this.props.preset) {
      case 'fullon-butt':
        valueLineWidth = knobContourWidth;
        valueLineRadius = knobRadius;
        valueContourCircumference = knobContourCircumference;
        fillColor = 'transparent';
        textColor = 'black';
        handColor = this.props.handColor || 'transparent';
        strokeLinecap = this.props.strokeLinecap || "butt";
        break;
      case 'fullon-round':
        valueLineWidth = knobContourWidth;
        valueLineRadius = knobRadius;
        valueContourCircumference = knobContourCircumference;
        fillColor = 'transparent';
        textColor = 'black';
        handColor = this.props.handColor || 'transparent';
        strokeLinecap = this.props.strokeLinecap || "round";
        break;
      case 'midlane-butt':
        valueLineWidth = knobContourWidth * 0.5;
        valueLineRadius = knobRadius;
        valueContourCircumference = knobContourCircumference;
        fillColor = 'transparent';
        textColor = 'black';
        handColor = this.props.handColor || 'transparent';
        strokeLinecap = this.props.strokeLinecap || "butt";
        break;
      case 'midlane-round':
        valueLineWidth = knobContourWidth * 0.5;
        valueLineRadius = knobRadius;
        valueContourCircumference = knobContourCircumference;
        fillColor = 'transparent';
        textColor = 'black';
        handColor = this.props.handColor || 'transparent';
        strokeLinecap = this.props.strokeLinecap || "round";
        break;
      case 'concentric':
        valueLineWidth = knobContourWidth * 0.5;
        valueLineRadius = knobRadius + knobContourWidth * 0.25;
        valueContourCircumference = 2 * Math.PI * valueLineRadius;
        fillColor = 'transparent';
        textColor = 'black';
        handColor = this.props.handColor || 'transparent';
        strokeLinecap = this.props.strokeLinecap || "butt";
        break;
      case 'blindfold':
        valueLineWidth = 0;
        valueLineRadius = knobRadius + knobContourWidth * 0.5;
        valueContourCircumference = 2 * Math.PI * valueLineRadius;
        fillColor = 'black';
        textColor = 'transparent';
        handColor = this.props.handColor || 'white';
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
          r={knobRadius}
          cx={center}
          cy={center}
          fill={fillColor}
          stroke="black"
          strokeWidth={knobContourWidth}
          strokeLinecap={strokeLinecap}
          strokeDasharray={knobContourCircumference}
          strokeDashoffset={knobContourCircumference * 0.25}
          transform={`rotate(135 ${center} ${center})`}
        />
        <circle
          r={valueLineRadius}
          cx={center}
          cy={center}
          fill={fillColor}
          stroke="#3FA9F5"
          strokeWidth={valueLineWidth}
          strokeLinecap={strokeLinecap}
          strokeDasharray={valueContourCircumference}
          strokeDashoffset={valueContourCircumference * (1 - value * 0.75)}
          transform={`rotate(135 ${center} ${center})`}
        />
        <line
          x1={center}
          y1={center}
          x2={center}
          y2={center - valueLineRadius}
          transform={`rotate(${-135 + value * 270} ${center} ${center})`}
          stroke={handColor}
          strokeWidth={2}
        />
        <text
          x="50%"
          y="50%"
          fill={textColor}
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {formatter(value)}
        </text>
      </svg>
    );
  }
}
