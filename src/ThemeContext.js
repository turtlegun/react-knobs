import React, { useContext } from 'react';

/**
 * @typedef ThemeContextValue
 * @type {object}
 * @property {string} knobColor - Color of the knob contour
 * @property {string} valueStrokeColor - Color of the stroke of the value contour
 * @property {string} headerTextColor - Color of the knob header text
 * @property {string} valueTextColor - Color of the value label text
 * @property {number} headerFontSize - Size of the knob header font
 * @property {number} valueFontSize - Size of the value label font
 * @property {number} knobStrokeWidth - Width of the stroke of the knob contour
 * @property {number} valueStrokeWidth - Width of the stroke of the value contour
 * @property {number} defaultScale - The default scale of all knobs
 */

/** @type {React.Context<ThemeContextValue>} */
export const ThemeContext = React.createContext({
  knobColor: 'black',
  valueStrokeColor: '#4580E6',
  headerTextColor: 'black',
  valueTextColor: 'black',
  headerFontSize: 22,
  valueFontSize: 20,
  knobStrokeWidth: 12,
  valueStrokeWidth: 6,
  defaultScale: 1,
});

/**
 * Hook to retrieve ThemeContext value.
 *
 * Intellisense-friendly shortcut to `useContext(ThemeContext)`.
 *
 * @returns {ThemeContextValue}
 */
export function useThemeContext() {
  return useContext(ThemeContext);
}
