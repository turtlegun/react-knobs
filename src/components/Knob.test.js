import React from 'react';
import { render } from '@testing-library/react';
import Knob from './Knob';

it('has value text in percents by default', () => {
  const valueTextPairs = [[0, '0%'], [0.5, '50%'], [1, '100%']];
  for (const [value, text] of valueTextPairs) {
    const { getByText } = render(<Knob value={value} />);
    expect(jest.fn(() => getByText(text))).not.toThrow();
  }
});

it('supports custom formatter', () => {
  const { getByText } = render(<Knob formatter={(_value) => "yes"} />);
  expect(jest.fn(() => getByText('yes'))).not.toThrow();
});

it('shows warning when unknown preset is specified', () => {
  var warn = jest.spyOn(global.console, 'warn');
  render(<Knob preset="actually-good-knob" />);
  expect(warn).toHaveBeenCalled();
});
