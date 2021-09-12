import connectDB from '../../config/mongoose.config';
import {
  createNewUser,
} from '../../lib/controllers/userController';

const signupHandler = async (req, res) => {
  switch (req.method) {
    case 'POST':
      await createNewUser(req, res);
      break;

    default:
      res.status(405).json({ message: 'This endpoint only support POST' });
      break;
  }
};
export default connectDB(signupHandler);
