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
 * Knob component
 * @param {object} props Component props
 * @param {number} props.value Value of the parameter controlled by knob
 * @param {number} [props.scale] Scale multiplier for layout and fonts
 * @param {string} [props.title] Title of the parameter controlled by knob
 * @param {string} [props.tooltip] Text to show on hover
 * @param {('fullon-butt'|'fullon-round'|'midlane-butt'|'midlane-round'|'concentric'|'blindfold')} [props.preset] Name of the preset to control knob appearance
 * @param {string} [props.handColor] Color of the hand displayed inside the knob
 * @param {string} [props.strokeLineCap] Name of the line cap type used in value contour
 * @param {function} [props.formatter] Function taking value and returning text to display inside the knob
 * @param {function} props.onChange Callback called with a new value when the knob is rotated
 */
export default function (props) {
  const { value, handleMouseDown } = useGenericKnobStateAndEventHandlers(props);
  const preset = props.preset || 'fullon-butt';
  const title = props.title || preset;
  const tooltip = props.tooltip;
  const formatter = props.formatter || ((value) => Math.floor(value * 100) + '%');
  const scale = props.scale == null ? 1 : props.scale;
  const size = DEFAULT_SIZE * scale;
  const center = size / 2;
  const knobContourWidth = 12 * scale;
  const knobRadius = size / 2 - knobContourWidth / 2;
  const knobContourCircumference = 2 * Math.PI * knobRadius;
  let valueContourWidth = 0;
  let valueContourRadius = 0;
  let valueContourCircumference = 0;
  let fillColor = 'red';
  let textColor = 'red';
  let handColor = 'red';
  let strokeLinecap = 'none';
  switch (preset) {
    case 'fullon-butt':
      valueContourWidth = knobContourWidth;
      valueContourRadius = knobRadius;
      valueContourCircumference = knobContourCircumference;
      fillColor = 'transparent';
      textColor = 'black';
      handColor = props.handColor || 'transparent';
      strokeLinecap = props.strokeLinecap || "butt";
      break;
    case 'fullon-round':
      valueContourWidth = knobContourWidth;
      valueContourRadius = knobRadius;
      valueContourCircumference = knobContourCircumference;
      fillColor = 'transparent';
      textColor = 'black';
      handColor = props.handColor || 'transparent';
      strokeLinecap = props.strokeLinecap || "round";
      break;
    case 'midlane-butt':
      valueContourWidth = knobContourWidth * 0.5;
      valueContourRadius = knobRadius;
      valueContourCircumference = knobContourCircumference;
      fillColor = 'transparent';
      textColor = 'black';
      handColor = props.handColor || 'transparent';
      strokeLinecap = props.strokeLinecap || "butt";
      break;
    case 'midlane-round':
      valueContourWidth = knobContourWidth * 0.5;
      valueContourRadius = knobRadius;
      valueContourCircumference = knobContourCircumference;
      fillColor = 'transparent';
      textColor = 'black';
      handColor = props.handColor || 'transparent';
      strokeLinecap = props.strokeLinecap || "round";
      break;
    case 'concentric':
      valueContourWidth = knobContourWidth * 0.5;
      valueContourRadius = knobRadius + knobContourWidth * 0.25;
      valueContourCircumference = 2 * Math.PI * valueContourRadius;
      fillColor = 'transparent';
      textColor = 'black';
      handColor = props.handColor || 'transparent';
      strokeLinecap = props.strokeLinecap || "butt";
      break;
    case 'blindfold':
      valueContourWidth = 0;
      valueContourRadius = knobRadius + knobContourWidth * 0.5;
      valueContourCircumference = 2 * Math.PI * valueContourRadius;
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
            r={valueContourRadius}
            cx={center}
            cy={center}
            fill={fillColor}
            stroke="#3FA9F5"
            strokeWidth={valueContourWidth}
            strokeLinecap={strokeLinecap}
            strokeDasharray={valueContourCircumference}
            strokeDashoffset={valueContourCircumference * (1 - value * 0.75)}
            transform={`rotate(135 ${center} ${center})`}
          />
          <line
            x1={center}
            y1={center}
            x2={center}
            y2={center - valueContourRadius}
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
