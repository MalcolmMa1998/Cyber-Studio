/**
 * @file Declare stories collection
 * @author Mingze Ma
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const storySchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: String,
    date: Date,
    photo_id: Schema.Types.ObjectId
  },
);

module.exports = mongoose.model('Story', storySchema);
