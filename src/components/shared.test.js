import React from 'react';
import { render } from '@testing-library/react';
import FullonKnob from './FullonKnob';
import MidlaneKnob from './MidlaneKnob';
import ConcentricKnob from './ConcentricKnob';
import BlindfoldKnob from './BlindfoldKnob';

for (const Knob of [FullonKnob, MidlaneKnob, ConcentricKnob]) {
  it(`${Knob.name} has value text in percents by default`, () => {
    const valueTextPairs = [[0, '0%'], [0.5, '50%'], [1, '100%']];
    for (const [value, text] of valueTextPairs) {
      const { getByText } = render(<Knob value={value} />);
      expect(jest.fn(() => getByText(text))).not.toThrow();
    }
  });
  it(`${Knob.name} supports custom formatter`, () => {
    const { getByText } = render(<Knob formatter={(_value) => "yes"} />);
    expect(jest.fn(() => getByText('yes'))).not.toThrow();
  });
}

for (const Knob of [FullonKnob, MidlaneKnob, ConcentricKnob, BlindfoldKnob]) {
  it(`${Knob.name} supports title`, () => {
    const { getByText } = render(<Knob title="yes" />);
    expect(jest.fn(() => getByText('yes'))).not.toThrow();
  });
}

const FAILING_PROPS = [
  { name: "value", value: "no", components: { FullonKnob: true, MidlaneKnob: true, ConcentricKnob: true, BlindfoldKnob: true } },
  { name: "defaultValue", value: "no", components: { FullonKnob: true, MidlaneKnob: true, ConcentricKnob: true, BlindfoldKnob: true } },
  { name: "scale", value: "no", components: { FullonKnob: true, MidlaneKnob: true, ConcentricKnob: true, BlindfoldKnob: true } },
  { name: "title", value: 42, components: { FullonKnob: true, MidlaneKnob: true, ConcentricKnob: true, BlindfoldKnob: true } },
  { name: "tooltip", value: 42, components: { FullonKnob: true, MidlaneKnob: true, ConcentricKnob: true, BlindfoldKnob: true } },
  { name: "knobStrokeWidth", value: "no", components: { FullonKnob: true, MidlaneKnob: true, ConcentricKnob: true, BlindfoldKnob: false } },
  { name: "valueStrokeWidth", value: "no", components: { FullonKnob: false, MidlaneKnob: true, ConcentricKnob: true, BlindfoldKnob: false } },
  { name: "headerFontSize", value: "no", components: { FullonKnob: true, MidlaneKnob: true, ConcentricKnob: true, BlindfoldKnob: true } },
  { name: "valueFontSize", value: "no", components: { FullonKnob: true, MidlaneKnob: true, ConcentricKnob: true, BlindfoldKnob: false } },
  { name: "knobColor", value: 42, components: { FullonKnob: true, MidlaneKnob: true, ConcentricKnob: true, BlindfoldKnob: true } },
  { name: "valueStrokeColor", value: 42, components: { FullonKnob: true, MidlaneKnob: true, ConcentricKnob: true, BlindfoldKnob: false } },
  { name: "valueTextColor", value: 42, components: { FullonKnob: true, MidlaneKnob: true, ConcentricKnob: true, BlindfoldKnob: false } },
  { name: "strokeLineCap", value: "no", components: { FullonKnob: true, MidlaneKnob: true, ConcentricKnob: false, BlindfoldKnob: false } },
  { name: "formatter", value: "no", components: { FullonKnob: true, MidlaneKnob: true, ConcentricKnob: true, BlindfoldKnob: false } },
  { name: "onChange", value: "no", components: { FullonKnob: true, MidlaneKnob: true, ConcentricKnob: true, BlindfoldKnob: true } },
];

for (const Knob of [FullonKnob, MidlaneKnob, ConcentricKnob, BlindfoldKnob]) {
  it(`${Knob.name} validates prop types`, () => {
    for (const prop of FAILING_PROPS) {
      if (prop.components[Knob.name]) {
        const spy = jest.spyOn(console, 'error').mockImplementation();
        try {
          render(<Knob {...{ [prop.name]: prop.value }} />);
        } catch (_) { /* nop */ } finally {
          expect(spy).toHaveBeenCalled();
          spy.mockRestore();
        }
      }
    }
  });
}
