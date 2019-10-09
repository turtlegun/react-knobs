# react-knobs

> SVG-based knobs for React applications

[![NPM](https://img.shields.io/npm/v/react-knobs.svg)](https://www.npmjs.com/package/react-knobs) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-knobs
```

## Usage

```jsx
import React from 'react';
import { FullonKnob /*, MidlaneKnob, ConcentricKnob, BlindfoldKnob, ThemeContext */ } from 'react-knobs';

function VolumeKnob(props) {
  return (
    <FullonKnob
      title="Volume"
      value={props.value}
      defaultValue={0.825}
      onChange={props.onChange}
      formatter={(value) =>
        value < 0.01
          ? '-inf'
          : Math.round(-64 + value * 70) + ' dB'
      }
    />
  );
}
```

## License

MIT © [Andrii Polishchuk](https://github.com/apo91)
