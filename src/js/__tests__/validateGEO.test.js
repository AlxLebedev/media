import validGeoposition from '../validGeoposition';

test.each([
  ['with valid coords', '51.50851, −0.12572', true],
  ['with valid coords', '51.50851,−0.12572', true],
  ['with valid coords', '[51.50851, −0.12572]', true],
  ['with invalid coords', '757.50851,−757.12572', false],
])(('Validate GEO %s'), (_, input, expected) => {
  expect(validGeoposition(input)).toBe(expected);
});
