import fs from 'fs';
import parseXml from '../xml';

test('it should parse xml to title', async () => {
  const asExpected = {
    id: '1',
    title: 'The Declaration of Independence of the United States of America',
    author: 'Jefferson, Thomas',
    publisher: 'Project Gutenberg',
    publicationDate: '1971-12-01',
    language: 'en',
    subjects: [
      'E201',
      'United States. Declaration of Independence',
      'United States -- History -- Revolution, 1775-1783 -- Sources',
      'JK',
    ],
    rights: 'Public domain in the USA.',
  };
  const path = `${__dirname}/../../__mocks__/example1.rdf`;
  const xml = fs.readFileSync(path, 'utf8');
  expect(await parseXml(xml)).toEqual(asExpected);
});

test('it should parse empty xml to title', async () => {
  const path = `${__dirname}/../../__mocks__/example0.rdf`;
  const xml = fs.readFileSync(path, 'utf8');
  expect(await parseXml(xml)).toEqual({});
});

test('it should parse incomplete xml to title', async () => {
  const asExpected = {
    id: '1',
    title: 'The Declaration of Independence of the United States of America',
    author: null,
    publisher: 'Project Gutenberg',
    publicationDate: null,
    language: null,
    subjects: [],
    rights: null,
  };
  const path = `${__dirname}/../../__mocks__/example3.rdf`;
  const xml = fs.readFileSync(path, 'utf8');
  expect(await parseXml(xml)).toEqual(asExpected);
});
