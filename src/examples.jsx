/* eslint no-useless-concat: "off" */

import React, { useState, useContext } from 'react';
import ThemeContext from './components/ThemeContext';
import FullonKnob from './components/FullonKnob';
import MidlaneKnob from './components/MidlaneKnob';
import ConcentricKnob from './components/ConcentricKnob';
import BlindfoldKnob from './components/BlindfoldKnob';

export default [
  {
    code:
      '// Knob in uncontrolled mode' + '\n' +
      'function ExampleKnob() {' + '\n' +
      '  return (' + '\n' +
      '    <FullonKnob' + '\n' +
      '      defaultValue={0.4}' + '\n' +
      '      onChange={(newValue) =>' + '\n' +
      '        newValue > 0.75 && alert(\'> 75% !\')}' + '\n' +
      '    />' + '\n' +
      '  );' + '\n' +
      '}',
    Component: () => (
      <FullonKnob
        defaultValue={0.4}
        onChange={(newValue) =>
          newValue > 0.75 && alert('> 75% !')
        }
      />
    )
  },
  {
    code:
      '// Knob in controlled mode' + '\n' +
      'function ExampleKnob() {' + '\n' +
      '  const [state, setState] = useState(0.33);' + '\n' +
      '  return(' + '\n' +
      '    <FullonKnob' + '\n' +
      '      value={state}' + '\n' +
      '      onChange={(newValue) => setState(newValue)}' + '\n' +
      '    />' + '\n' +
      '  );' + '\n' +
      '}',
    Component: () => {
      const [state, setState] = useState(0.33);
      return (
        <FullonKnob
          value={state}
          onChange={(newValue) => setState(newValue)}
        />
      );
    }
  },
  {
    code:
      '// Knob with title and value formatter' + '\n' +
      'function ExampleKnob() {' + '\n' +
      '  return (' + '\n' +
      '    <FullonKnob' + '\n' +
      '      title="Volume"' + '\n' +
      '      defaultValue={0.825}' + '\n' +
      '      formatter={(value) =>' + '\n' +
      '        value < 0.01' + '\n' +
      '          ? \'-inf\'' + '\n' +
      '          : Math.round(-64 + value * 70) + \' dB\'' + '\n' +
      '      }' + '\n' +
      '    />' + '\n' +
      '  );' + '\n' +
      '}',
    Component: () => (
      <FullonKnob
        title="Volume"
        defaultValue={0.825}
        formatter={(value) =>
          value < 0.01
            ? '-inf'
            : Math.round(-64 + value * 70) + ' dB'
        }
      />
    )
  },
  {
    code:
      '// Other knob types' + '\n' +
      'function ExampleKnob() {' + '\n' +
      '  const containerStyle = {' + '\n' +
      '    display: \'grid\',' + '\n' +
      '    grid: \'auto / auto auto auto\',' + '\n' +
      '    gridGap: 3' + '\n' +
      '  };' + '\n' +
      '  return (' + '\n' +
      '    <div style={containerStyle}>' + '\n' +
      '      <MidlaneKnob scale={0.5} defaultValue={0.3} />' + '\n' +
      '      <ConcentricKnob scale={0.5} defaultValue={0.5} />' + '\n' +
      '      <BlindfoldKnob scale={0.5} defaultValue={0.7} />' + '\n' +
      '    </div>' + '\n' +
      '  );' + '\n' +
      '}',
    Component: () => {
      const containerStyle = {
        display: 'grid',
        grid: 'auto / auto auto auto',
        gridGap: 3
      };
      return (
        <div style={containerStyle}>
          <MidlaneKnob scale={0.5} defaultValue={0.3} />
          <ConcentricKnob scale={0.5} defaultValue={0.5} />
          <BlindfoldKnob scale={0.5} defaultValue={0.7} />
        </div>
      );
    }
  },
  {
    code:
      '// An ultimate example' + '\n' +
      'function ExampleKnob() {' + '\n' +
      '  const theme = useContext(ThemeContext);' + '\n' +
      '  const [knobStrokeWidth, setKnobStrokeWidth] = useState(0.5);' + '\n' +
      '  const [valueStrokeWidth, setValueStrokeWidth] = useState(0.5);' + '\n' +
      '  const [red, setRed] = useState(0.5);' + '\n' +
      '  const [green, setGreen] = useState(0.5);' + '\n' +
      '  const [blue, setBlue] = useState(0.5);' + '\n' +
      '  const themeWithValueStrokeColor = ([r, g, b], theme) => ({' + '\n' +
      '    ...theme,' + '\n' +
      '    valueStrokeColor: `rgb(${r * 255}, ${g * 255}, ${b * 255})`,' + '\n' +
      '  });' + '\n' +
      '  const customizedTheme = themeWithValueStrokeColor([red, green, blue], {' + '\n' +
      '    ...theme,' + '\n' +
      '    knobStrokeWidth: 6 + 12 * knobStrokeWidth,' + '\n' +
      '    valueStrokeWidth: 3 + 6 * valueStrokeWidth,' + '\n' +
      '  });' + '\n' +
      '  const containerStyle = {' + '\n' +
      '    display: \'grid\',' + '\n' +
      '    gridTemplateAreas:' + '\n' +
      '      \'". k   k   k   k   k   k   ."\' + \'\\n\' +' + '\n' +
      '      \'". ksw ksw ksw vsw vsw vsw ."\' + \'\\n\' +' + '\n' +
      '      \'". r   r   g   g   b   b   ."\' + \'\\n\',' + '\n' +
      '    gridGap: 8' + '\n' +
      '  };' + '\n' +
      '  return (' + '\n' +
      '    <div style={containerStyle}>' + '\n' +
      '      <div style={{ gridArea: \'k\' }}>' + '\n' +
      '        <ThemeContext.Provider value={customizedTheme}>' + '\n' +
      '          <MidlaneKnob defaultValue={0.5} />' + '\n' +
      '        </ThemeContext.Provider>' + '\n' +
      '      </div>' + '\n' +
      '      <div style={{ gridArea: \'ksw\' }}>' + '\n' +
      '        <BlindfoldKnob title="Knob Stroke" scale={0.5} value={knobStrokeWidth} onChange={setKnobStrokeWidth} />' + '\n' +
      '      </div>' + '\n' +
      '      <div style={{ gridArea: \'vsw\' }}>' + '\n' +
      '        <BlindfoldKnob title="Value Stroke" scale={0.5} value={valueStrokeWidth} onChange={setValueStrokeWidth} />' + '\n' +
      '      </div>' + '\n' +
      '      <div style={{ gridArea: \'r\' }}>' + '\n' +
      '        <ThemeContext.Provider value={themeWithValueStrokeColor([0.5 + 0.5 * red, 0, 0], theme)}>' + '\n' +
      '          <FullonKnob title="R" scale={0.33} value={red} onChange={setRed} />' + '\n' +
      '        </ThemeContext.Provider>' + '\n' +
      '      </div>' + '\n' +
      '      <div style={{ gridArea: \'g\' }}>' + '\n' +
      '        <ThemeContext.Provider value={themeWithValueStrokeColor([0, 0.5 + 0.5 * green, 0], theme)}>' + '\n' +
      '          <FullonKnob title="G" scale={0.33} value={green} onChange={setGreen} />' + '\n' +
      '        </ThemeContext.Provider>' + '\n' +
      '      </div>' + '\n' +
      '      <div style={{ gridArea: \'b\' }}>' + '\n' +
      '        <ThemeContext.Provider value={themeWithValueStrokeColor([0, 0, 0.5 + 0.5 * blue], theme)}>' + '\n' +
      '          <FullonKnob title="B" scale={0.33} value={blue} onChange={setBlue} />' + '\n' +
      '        </ThemeContext.Provider>' + '\n' +
      '      </div>' + '\n' +
      '    </div>' + '\n' +
      '  );' + '\n' +
      '}',
    codeFontSize: 12,
    Component: () => {
      const theme = useContext(ThemeContext);
      const [knobStrokeWidth, setKnobStrokeWidth] = useState(0.5);
      const [valueStrokeWidth, setValueStrokeWidth] = useState(0.5);
      const [red, setRed] = useState(0.5);
      const [green, setGreen] = useState(0.5);
      const [blue, setBlue] = useState(0.5);
      const themeWithValueStrokeColor = ([r, g, b], theme) => ({
        ...theme,
        valueStrokeColor: `rgb(${r * 255}, ${g * 255}, ${b * 255})`,
      });
      const customizedTheme = themeWithValueStrokeColor([red, green, blue], {
        ...theme,
        knobStrokeWidth: 6 + 12 * knobStrokeWidth,
        valueStrokeWidth: 3 + 6 * valueStrokeWidth,
      });
      const containerStyle = {
        display: 'grid',
        gridTemplateAreas:
          '". k   k   k   k   k   k   ."' + '\n' +
          '". ksw ksw ksw vsw vsw vsw ."' + '\n' +
          '". r   r   g   g   b   b   ."' + '\n',
        gridGap: 8
      };
      return (
        <div style={containerStyle}>
          <div style={{ gridArea: 'k' }}>
            <ThemeContext.Provider value={customizedTheme}>
              <MidlaneKnob defaultValue={0.5} />
            </ThemeContext.Provider>
          </div>
          <div style={{ gridArea: 'ksw' }}>
            <BlindfoldKnob title="Knob Stroke" scale={0.5} value={knobStrokeWidth} onChange={setKnobStrokeWidth} />
          </div>
          <div style={{ gridArea: 'vsw' }}>
            <BlindfoldKnob title="Value Stroke" scale={0.5} value={valueStrokeWidth} onChange={setValueStrokeWidth} />
          </div>
          <div style={{ gridArea: 'r' }}>
            <ThemeContext.Provider value={themeWithValueStrokeColor([0.5 + 0.5 * red, 0, 0], theme)}>
              <FullonKnob title="R" scale={0.33} value={red} onChange={setRed} />
            </ThemeContext.Provider>
          </div>
          <div style={{ gridArea: 'g' }}>
            <ThemeContext.Provider value={themeWithValueStrokeColor([0, 0.5 + 0.5 * green, 0], theme)}>
              <FullonKnob title="G" scale={0.33} value={green} onChange={setGreen} />
            </ThemeContext.Provider>
          </div>
          <div style={{ gridArea: 'b' }}>
            <ThemeContext.Provider value={themeWithValueStrokeColor([0, 0, 0.5 + 0.5 * blue], theme)}>
              <FullonKnob title="B" scale={0.33} value={blue} onChange={setBlue} />
            </ThemeContext.Provider>
          </div>
        </div>
      );
    }
  },
];