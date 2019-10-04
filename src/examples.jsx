/* eslint no-useless-concat: "off" */

import React, { useState } from 'react';
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
];