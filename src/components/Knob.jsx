import React, { useState, useEffect, useMemo, useRef, useLayoutEffect } from 'react';

const DEFAULT_SIZE = 120;
const DEFAULT_TITLE_FONT_SIZE = 22;

const headerStyle = {
  textAlign: 'center',
  fontSize: DEFAULT_TITLE_FONT_SIZE,
  marginBottom: 8,
};

const unselectableStyle = {
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
};

const centeredStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function (props) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartValue, setDragStartValue] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);

  const handleMouseDown = (event) => {
    document.body.style.cursor = 'none';
    setIsDragging(true);
    setDragStartValue(props.value);
    setDragStartY(event.pageY);
  };

  const handleMouseUp = useEventCallback(() => {
    document.body.style.cursor = 'default';
    setIsDragging(false);
  });

  const handleMouseMove = useEventCallback((event) => {
    if (isDragging && props.onChange) {
      const pivot = dragStartValue * 60;
      const pad = 60 - pivot;
      const newValue = (pivot + Math.max(-pivot, Math.min(pad, dragStartY - event.pageY))) / 60;
      props.onChange(newValue);
    }
  });

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseUp, handleMouseMove]);

  const preset = props.preset || 'fullon-butt';
  const title = props.title || preset;
  const tooltip = props.tooltip;
  const formatter = props.formatter || ((value) => Math.floor(value * 100) + '%');
  const scale = props.scale == null ? 1 : props.scale;
  const value = props.value == null ? 1 : props.value;
  const size = DEFAULT_SIZE * scale;
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
  switch (preset) {
    case 'fullon-butt':
      valueLineWidth = knobContourWidth;
      valueLineRadius = knobRadius;
      valueContourCircumference = knobContourCircumference;
      fillColor = 'transparent';
      textColor = 'black';
      handColor = props.handColor || 'transparent';
      strokeLinecap = props.strokeLinecap || "butt";
      break;
    case 'fullon-round':
      valueLineWidth = knobContourWidth;
      valueLineRadius = knobRadius;
      valueContourCircumference = knobContourCircumference;
      fillColor = 'transparent';
      textColor = 'black';
      handColor = props.handColor || 'transparent';
      strokeLinecap = props.strokeLinecap || "round";
      break;
    case 'midlane-butt':
      valueLineWidth = knobContourWidth * 0.5;
      valueLineRadius = knobRadius;
      valueContourCircumference = knobContourCircumference;
      fillColor = 'transparent';
      textColor = 'black';
      handColor = props.handColor || 'transparent';
      strokeLinecap = props.strokeLinecap || "butt";
      break;
    case 'midlane-round':
      valueLineWidth = knobContourWidth * 0.5;
      valueLineRadius = knobRadius;
      valueContourCircumference = knobContourCircumference;
      fillColor = 'transparent';
      textColor = 'black';
      handColor = props.handColor || 'transparent';
      strokeLinecap = props.strokeLinecap || "round";
      break;
    case 'concentric':
      valueLineWidth = knobContourWidth * 0.5;
      valueLineRadius = knobRadius + knobContourWidth * 0.25;
      valueContourCircumference = 2 * Math.PI * valueLineRadius;
      fillColor = 'transparent';
      textColor = 'black';
      handColor = props.handColor || 'transparent';
      strokeLinecap = props.strokeLinecap || "butt";
      break;
    case 'blindfold':
      valueLineWidth = 0;
      valueLineRadius = knobRadius + knobContourWidth * 0.5;
      valueContourCircumference = 2 * Math.PI * valueLineRadius;
      fillColor = 'black';
      textColor = 'transparent';
      handColor = props.handColor || 'white';
      strokeLinecap = props.strokeLinecap || "round";
      break;
    default:
      console.warn(`Unknown Knob preset: "${preset}"`);
      break;
  }

  return (
    <>
      <header style={headerStyle}>
        {title}
      </header>
      <div style={centeredStyle}>
        <svg
          width={size}
          height={size}
          onMouseDown={handleMouseDown}
          style={unselectableStyle}
          data-testid="knob"
        >
          <title>
            {tooltip}
          </title>
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
            y={center}
            fill={textColor}
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {formatter(value)}
          </text>
        </svg>
      </div>
    </>
  );
}

function useEventCallback(fn) {
  let ref = useRef();
  useLayoutEffect(() => {
    ref.current = fn;
  });
  return useMemo(() => (...args) => (0, ref.current)(...args), []);
}