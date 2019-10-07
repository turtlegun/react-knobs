import React from 'react';
import { render } from '@testing-library/react';
import FullonKnob from './FullonKnob';
import MidlaneKnob from './MidlaneKnob';
import ConcentricKnob from './ConcentricKnob';
import BlindfoldKnob from './BlindfoldKnob';

for (const Knob of [FullonKnob, MidlaneKnob, ConcentricKnob]) {
  const componentName = Knob.name;

  it(`${componentName} has value text in percents by default`, () => {
    const valueTextPairs = [[0, '0%'], [0.5, '50%'], [1, '100%']];
    for (const [value, text] of valueTextPairs) {
      const { getByText } = render(<Knob value={value} />);
      expect(jest.fn(() => getByText(text))).not.toThrow();
    }
  });

  it(`${componentName} supports custom formatter`, () => {
    const { getByText } = render(<Knob formatter={(_value) => "yes"} />);
    expect(jest.fn(() => getByText('yes'))).not.toThrow();
  });
}

for (const Knob of [FullonKnob, MidlaneKnob, ConcentricKnob, BlindfoldKnob]) {
  const componentName = Knob.name;

  it(`${componentName} supports title`, () => {
    const { getByText } = render(<Knob title="yes" />);
    expect(jest.fn(() => getByText('yes'))).not.toThrow();
  });
}
