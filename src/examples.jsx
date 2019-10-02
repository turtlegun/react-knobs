import React, { useState } from 'react';
import Knob from './components/Knob';

export default [
  [
    `
    function Knob1() {
      const [value, setValue] = useState(0.4);
      return (
        <Knob
          preset="fullon-butt"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      );
    }
    `,
    function () {
      const [value, setValue] = useState(0.4);
      return (
        <Knob
          preset="fullon-butt"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      );
    }
  ]
];