import mongoose from 'mongoose';

const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    console.log(`Request method: ${req.method}`);
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(process.env.mongodburl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(`Request entry: ${req.method}`);
  return handler(req, res);
};

export default connectDB;
