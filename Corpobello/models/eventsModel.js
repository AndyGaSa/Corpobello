import mongoose from 'mongoose';

const { Schema } = mongoose;

const event = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: 'https://uploads-ssl.webflow.com/5bc989248743153705f137da/60421d4173860c79a4393753_massage__pain_01.jpg',
  },
  description: {
    type: String,
    required: true,
  },
});

mongoose.models = {};

const Event = mongoose.model('Event', event);

export default Event;
