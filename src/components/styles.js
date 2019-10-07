export const DEFAULT_SIZE = 120;

export const header = (scale, props, theme) => ({
  textAlign: 'center',
  color: props.headerTextColor || theme.headerTextColor,
  fontSize: 22 * scale,
  marginBottom: 8 * scale,
});

export const unselectable = {
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
};

export const centered = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};