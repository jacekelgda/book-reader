import Title from '../model/title';

export default async (data) => {
  const title = new Title(data);
  await title.save();

  return title.toJSON();
};
