import mongoose from 'mongoose';
import MongodbMemoryServer from 'mongodb-memory-server';
import persistData from '../storage';

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

test('it should persist in storage', async () => {
  const data = {
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

  expect(await persistData(data)).toEqual(data);
});
