export const DEFAULT_SIZE = 120;

export const header = (scale) => ({
  textAlign: 'center',
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