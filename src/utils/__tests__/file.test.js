import readFile from '../file';

test('it should read file by path', () => {
  const filePath = `${__dirname}/../../__mocks__/example0.rdf`;
  expect(readFile(filePath)).toEqual('<?xml version="1.0" encoding="utf-8"?>');
});
