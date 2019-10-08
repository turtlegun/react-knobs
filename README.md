# react-knobs

> SVG-based knobs for React applications

[![NPM](https://img.shields.io/npm/v/react-knobs.svg)](https://www.npmjs.com/package/react-knobs) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-knobs
```

## Usage

```jsx
import React, { useState } from 'react'
import { FullonKnob } from 'react-knobs'

function ExampleComponent() {
  const [state, setState] = useState(0.33);
  return (
    <FullonKnob
      value={state}
      onChange={(newValue) => setState(newValue)}
    />
  );
}
```

## License

MIT © [Andrii Polishchuk](https://github.com/apo91)
