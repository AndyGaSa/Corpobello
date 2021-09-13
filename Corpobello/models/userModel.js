import mongoose from 'mongoose';

const { Schema } = mongoose;

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: 'https://media.istockphoto.com/vectors/continuous-linear-drawing-of-female-face-line-art-vector-id1317825285?k=20&m=1317825285&s=612x612&w=0&h=1iVYGUaFRZJbGpLAOpebpjmkBWePovqy-f-J-RkFvbQ=',
  },
  description: {
    type: String,
    default: '',
  },
  gender: {
    type: String,
    default: 'unknown',
  },
});

mongoose.models = {};

const User = mongoose.model('User', user);

export default User;
