import React from 'react';
import PropTypes from 'prop-types';
import { useThemeContext } from '../ThemeContext';
import useGenericKnobStateAndEventHandlers from './useGenericKnobStateAndEventHandlers';
import * as styles from './styles';

/**
 * MidlaneKnob component
 * @param {object} props Component props
 * @param {number} props.value Value of the parameter controlled by knob
 * @param {number} props.defaultValue Default value of the parameter controlled by knob (uncontrolled mode)
 * @param {number} [props.scale] Scale multiplier for layout and fonts
 * @param {string} [props.title] Title of the parameter controlled by knob
 * @param {string} [props.tooltip] Text to show on hover
 * @param {number} [props.knobStrokeWidth] (theme) Width of the stroke of the knob contour
 * @param {number} [props.valueStrokeWidth] (theme) Width of the stroke of the value contour
 * @param {number} [props.headerFontSize] (theme) Size of the knob header font
 * @param {number} [props.valueFontSize] (theme) Size of the value label font
 * @param {string} [props.knobColor] (theme) Color of the knob contour
 * @param {string} [props.valueStrokeColor] (theme) Color of the stroke of the value contour
 * @param {string} [props.valueTextColor] (theme) Color of the value label text
 * @param {('butt'|'round'|'square')} [props.strokeLineCap] (theme) Name of the line cap type used in value contour
 * @param {function} [props.formatter] Function taking value and returning text to display inside the knob
 * @param {function} props.onChange Callback called with a new value when the knob is rotated
 */
export default function MidlaneKnob(props) {
  const theme = useThemeContext();
  const { value, handleDoubleClick, handleMouseDown } = useGenericKnobStateAndEventHandlers(props);
  const title = props.title;
  const tooltip = props.tooltip;
  const formatter = props.formatter || ((value) => Math.floor(value * 100) + '%');
  const scale = theme.defaultScale * (props.scale == null ? 1 : props.scale);
  const size = styles.DEFAULT_SIZE * scale;
  const center = size / 2;
  const knobStrokeWidth = (props.knobStrokeWidth || theme.knobStrokeWidth) * scale;
  const knobRadius = size / 2 - knobStrokeWidth / 2;
  const knobStrokeCircumference = 2 * Math.PI * knobRadius;
  const valueStrokeWidth = (props.valueStrokeWidth || theme.valueStrokeWidth) * scale;
  const valueStrokeRadius = knobRadius;
  const valueStrokeCircumference = knobStrokeCircumference;
  const strokeLineCap = props.strokeLineCap || 'butt';
  return (
    <div>
      <header style={styles.header(scale, props, theme)}>
        {title}
      </header>
      <div style={styles.centered}>
        <svg
          width={size}
          height={size}
          onDoubleClick={handleDoubleClick}
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
            fill="transparent"
            stroke={props.knobColor || theme.knobColor}
            strokeWidth={knobStrokeWidth}
            strokeLinecap={strokeLineCap}
            strokeDasharray={knobStrokeCircumference}
            strokeDashoffset={knobStrokeCircumference * 0.25}
            transform={`rotate(135 ${center} ${center})`}
          />
          <circle
            r={valueStrokeRadius}
            cx={center}
            cy={center}
            fill="transparent"
            stroke={props.valueStrokeColor || theme.valueStrokeColor}
            strokeWidth={valueStrokeWidth}
            strokeLinecap={strokeLineCap}
            strokeDasharray={valueStrokeCircumference}
            strokeDashoffset={valueStrokeCircumference * (1 - value * 0.75)}
            transform={`rotate(135 ${center} ${center})`}
          />
          <text
            x="50%"
            y={center}
            fontSize={(props.valueFontSize || theme.valueFontSize) * scale}
            fill={props.valueTextColor || theme.valueTextColor}
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

MidlaneKnob.propTypes = {
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  scale: PropTypes.number,
  title: PropTypes.string,
  tooltip: PropTypes.string,
  knobStrokeWidth: PropTypes.number,
  valueStrokeWidth: PropTypes.number,
  headerFontSize: PropTypes.number,
  valueFontSize: PropTypes.number,
  knobColor: PropTypes.string,
  valueStrokeColor: PropTypes.string,
  valueTextColor: PropTypes.string,
  strokeLineCap: PropTypes.oneOf(['butt', 'round', 'square']),
  formatter: PropTypes.func,
  onChange: PropTypes.func,
};
