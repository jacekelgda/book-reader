import readFile from './utils/file';
import persistData from './utils/storage';
import parseXml from './utils/xml';

export default async (filePath) => {
  const fileContent = readFile(filePath);
  const parsedContent = await parseXml(fileContent);

  return persistData(parsedContent);
};
