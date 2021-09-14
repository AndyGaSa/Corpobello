import connectDB from '../../config/mongoose.config';
import {
  createNewUser,
} from '../../lib/controllers/userController';

const signupHandler = async (req, res) => {
  if (req.method === 'POST') {
    createNewUser(req, res);
  } else {
    res.status(405).json({ message: 'This endpoint only support POST' });
  }
};
export default connectDB(signupHandler);
