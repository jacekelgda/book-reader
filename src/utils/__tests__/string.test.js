import stripDelimiter from '../string';

test('it should strip xml tags', () => {
  expect(stripDelimiter('tag:name')).toEqual('name');
});
