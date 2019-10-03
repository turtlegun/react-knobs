import React from 'react';
import useGenericKnobStateAndEventHandlers from './useGenericKnobStateAndEventHandlers';
import * as styles from './styles';

/**
 * ConcentricKnob component
 * @param {object} props Component props
 * @param {number} props.value Value of the parameter controlled by knob
 * @param {number} props.defaultValue Default value of the parameter controlled by knob (uncontrolled mode)
 * @param {number} [props.scale] Scale multiplier for layout and fonts
 * @param {string} [props.title] Title of the parameter controlled by knob
 * @param {string} [props.tooltip] Text to show on hover
 * @param {function} [props.formatter] Function taking value and returning text to display inside the knob
 * @param {function} props.onChange Callback called with a new value when the knob is rotated
 */
export default function (props) {
  const { value, handleMouseDown } = useGenericKnobStateAndEventHandlers(props);
  const title = props.title;
  const tooltip = props.tooltip;
  const formatter = props.formatter || ((value) => Math.floor(value * 100) + '%');
  const scale = props.scale == null ? 1 : props.scale;
  const size = styles.DEFAULT_SIZE * scale;
  const center = size / 2;
  const knobContourWidth = 12 * scale;
  const knobRadius = size / 2 - knobContourWidth / 2;
  const knobContourCircumference = 2 * Math.PI * knobRadius;
  const valueContourWidth = knobContourWidth * 0.5;
  const valueContourRadius = knobRadius + knobContourWidth * 0.25;
  const valueContourCircumference = 2 * Math.PI * valueContourRadius;
  const fillColor = 'transparent';
  const textColor = 'black';
  const strokeLineCap = "butt";
  return (
    <>
      <header style={styles.header}>
        {title}
      </header>
      <div style={styles.centered}>
        <svg
          width={size}
          height={size}
          onMouseDown={handleMouseDown}
          style={styles.unselectable}
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
            strokeWidth={knobContourWidth - 2}
            strokeLinecap={strokeLineCap}
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
