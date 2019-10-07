import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';
import useGenericKnobStateAndEventHandlers from './useGenericKnobStateAndEventHandlers';
import * as styles from './styles';

/**
 * BlindfoldKnob component
 * @param {object} props Component props
 * @param {number} props.value Value of the parameter controlled by knob
 * @param {number} props.defaultValue Default value of the parameter controlled by knob (uncontrolled mode)
 * @param {number} [props.scale] Scale multiplier for layout and fonts
 * @param {string} [props.title] Title of the parameter controlled by knob
 * @param {string} [props.tooltip] Text to show on hover
 * @param {function} props.onChange Callback called with a new value when the knob is rotated
 */
export default function BlindfoldKnob(props) {
  const theme = useContext(ThemeContext);
  const { value, handleMouseDown } = useGenericKnobStateAndEventHandlers(props);
  const title = props.title;
  const tooltip = props.tooltip;
  const scale = theme.defaultScale * (props.scale == null ? 1 : props.scale);
  const size = styles.DEFAULT_SIZE * scale;
  const center = size / 2;
  const radius = size / 2;
  const handColor = props.handColor || 'white';
  return (
    <div>
      <header style={styles.header(scale, props, theme)}>
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
            r={radius}
            cx={center}
            cy={center}
            fill={props.knobColor || theme.knobColor}
            transform={`rotate(135 ${center} ${center})`}
          />
          <line
            x1={center}
            y1={center}
            x2={center}
            y2={center - radius}
            transform={`rotate(${-135 + value * 270} ${center} ${center})`}
            stroke={handColor}
            strokeWidth={2}
          />
        </svg>
      </div>
    </div>
  );
}
