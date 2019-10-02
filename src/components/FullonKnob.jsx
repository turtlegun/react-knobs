import React from 'react';
import useGenericKnobStateAndEventHandlers from './useGenericKnobStateAndEventHandlers';

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

/**
 * FullonKnob component
 * @param {object} props Component props
 * @param {number} props.value Value of the parameter controlled by knob
 * @param {number} [props.scale] Scale multiplier for layout and fonts
 * @param {string} [props.title] Title of the parameter controlled by knob
 * @param {string} [props.tooltip] Text to show on hover
 * @param {('butt'|'round'|'square')} [props.strokeLineCap] Name of the line cap type used in value contour
 * @param {function} [props.formatter] Function taking value and returning text to display inside the knob
 * @param {function} props.onChange Callback called with a new value when the knob is rotated
 */
export default function (props) {
  const { value, handleMouseDown } = useGenericKnobStateAndEventHandlers(props);
  const title = props.title;
  const tooltip = props.tooltip;
  const formatter = props.formatter || ((value) => Math.floor(value * 100) + '%');
  const scale = props.scale == null ? 1 : props.scale;
  const size = DEFAULT_SIZE * scale;
  const center = size / 2;
  const knobContourWidth = 12 * scale;
  const knobRadius = size / 2 - knobContourWidth / 2;
  const knobContourCircumference = 2 * Math.PI * knobRadius;
  const valueContourWidth = knobContourWidth;
  const valueContourRadius = knobRadius;
  const valueContourCircumference = knobContourCircumference;
  const fillColor = 'transparent';
  const textColor = 'black';
  const strokeLineCap = props.strokeLineCap || 'butt';
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
            strokeLinecap={strokeLineCap}
            strokeDasharray={knobContourCircumference}
            strokeDashoffset={knobContourCircumference * (0.25 + value * 0.75)}
            transform={`rotate(${135 + value * 270} ${center} ${center})`}
          />
          <circle
            r={valueContourRadius}
            cx={center}
            cy={center}
            fill={fillColor}
            stroke="#3FA9F5"
            strokeWidth={valueContourWidth}
            strokeLinecap={strokeLineCap}
            strokeDasharray={valueContourCircumference}
            strokeDashoffset={valueContourCircumference * (1 - value * 0.75)}
            transform={`rotate(135 ${center} ${center})`}
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
