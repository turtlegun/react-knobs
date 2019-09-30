import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('renders without crashing', () => {
  render(<App />);
});

it('contains knobs', () => {
  const { queryAllByTestId } = render(<App />);
  const knobs = queryAllByTestId('knob');
  expect(knobs.length).toBeGreaterThan(0);
});