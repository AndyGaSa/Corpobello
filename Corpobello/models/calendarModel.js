import mongoose from 'mongoose';

const { Schema } = mongoose;

const calendar = new Schema({
  day: {
    type: String,
    required: true,
  },
  hoursAndMinutes: [{
    type: Object,
  }],
  freeTime: {
    type: Number,
    required: true,
    default: 600,
  },
});

mongoose.models = {};

const Calendar = mongoose.model('Calendar', calendar);

export default Calendar;
