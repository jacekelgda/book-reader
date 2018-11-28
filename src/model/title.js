import mongoose from 'mongoose';

const TitleSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    author: String,
    publisher: String,
    publicationDate: String,
    language: String,
    subjects: [String],
    rights: String,
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id; // eslint-disable-line
        delete ret.__v; // eslint-disable-line
      },
    },
  },
);

module.exports = mongoose.model('Title', TitleSchema);
