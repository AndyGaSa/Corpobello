import connectDB from '../../config/mongoose.config';
import {
  login, updateUser,
} from '../../lib/controllers/userController';

const userHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      await login(req, res);
      break;

    case 'PUT':
      await updateUser(req, res);
      break;

    default:
      break;
  }
};

export default connectDB(userHandler);
