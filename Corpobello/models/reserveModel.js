import mongoose from 'mongoose';

const { Schema } = mongoose;

const reserve = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    day: {
      type: String,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
    minute: {
      type: Number,
      required: true,
    },
  },
  tel: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  personal: {
    type: String,
    required: true,
  },
});

mongoose.models = {};

const Reserve = mongoose.model('Reserve', reserve);

export default Reserve;
