import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';
import useGenericKnobStateAndEventHandlers from './useGenericKnobStateAndEventHandlers';
import * as styles from './styles';

/**
 * FullonKnob component
 * @param {object} props Component props
 * @param {number} props.value Value of the parameter controlled by knob
 * @param {number} props.defaultValue Default value of the parameter controlled by knob (uncontrolled mode)
 * @param {number} [props.scale] Scale multiplier for layout and fonts
 * @param {string} [props.title] Title of the parameter controlled by knob
 * @param {string} [props.tooltip] Text to show on hover
 * @param {('butt'|'round'|'square')} [props.strokeLineCap] Name of the line cap type used in value contour
 * @param {function} [props.formatter] Function taking value and returning text to display inside the knob
 * @param {function} props.onChange Callback called with a new value when the knob is rotated
 */
export default function FullonKnob(props) {
  const theme = useContext(ThemeContext);
  const { value, handleMouseDown } = useGenericKnobStateAndEventHandlers(props);
  const title = props.title;
  const tooltip = props.tooltip;
  const formatter = props.formatter || ((value) => Math.floor(value * 100) + '%');
  const scale = theme.defaultScale * (props.scale == null ? 1 : props.scale);
  const size = styles.DEFAULT_SIZE * scale;
  const center = size / 2;
  const knobContourWidth = 12 * scale;
  const knobRadius = size / 2 - knobContourWidth / 2;
  const knobContourCircumference = 2 * Math.PI * knobRadius;
  const valueContourWidth = knobContourWidth;
  const valueContourRadius = knobRadius;
  const valueContourCircumference = knobContourCircumference;
  const fillColor = 'transparent';
  const strokeLineCap = props.strokeLineCap || 'butt';
  return (
    <div>
      <header style={styles.header(scale, theme)}>
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
            stroke={theme.knobColor}
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
            stroke={theme.valueContourColor}
            strokeWidth={valueContourWidth}
            strokeLinecap={strokeLineCap}
            strokeDasharray={valueContourCircumference}
            strokeDashoffset={valueContourCircumference * (1 - value * 0.75)}
            transform={`rotate(135 ${center} ${center})`}
          />
          <text
            x="50%"
            y={center}
            fontSize={16 * scale}
            fill={theme.valueTextColor}
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {formatter(value)}
          </text>
        </svg>
      </div>
    </div>
  );
}
