import mongoose from 'mongoose';

const { Schema } = mongoose;

const reserve = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
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
