import mongoose from 'mongoose';
import MongodbMemoryServer from 'mongodb-memory-server';
import fileParser from '../fileParser';
import Title from '../model/title';

let mongoServer;

beforeEach(async () => {
  mongoServer = new MongodbMemoryServer();
  const uri = await mongoServer.getConnectionString();
  await mongoose.connect(
    uri,
    { useNewUrlParser: true },
  );
});

afterEach(() => {
  mongoose.disconnect();
  mongoServer.stop();
});

test('e2e: it should parse example file 1', async () => {
  const asExpected = {
    id: 1,
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
  const filePath = `${__dirname}/../__mocks__/example1.rdf`;
  expect(await fileParser(filePath)).toEqual(asExpected);
});

test('e2e: it should parse example file 2', async () => {
  const asExpected = {
    id: 30300,
    title: 'Orphans of the Storm',
    author: 'MacMahon, Henry',
    publisher: 'Project Gutenberg',
    publicationDate: '2009-10-20',
    language: 'en',
    subjects: [
      'Orphans -- Fiction',
      'PS',
      'Sisters -- Fiction',
      'France -- History -- Revolution, 1789-1799 -- Fiction',
    ],
    rights: 'Public domain in the USA.',
  };
  const filePath = `${__dirname}/../__mocks__/example2.rdf`;
  expect(await fileParser(filePath)).toEqual(asExpected);
});

test('e2e: it should persist result in storage', async () => {
  const asExpected = {
    id: 1,
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
  const filePath = `${__dirname}/../__mocks__/example1.rdf`;
  await fileParser(filePath);
  const record = await Title.findOne({});
  expect(JSON.parse(JSON.stringify(record))).toEqual(asExpected);
});
