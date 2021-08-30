import connectDB from '../../middlewares/mongoose.config';
import {
  createNewUser, getOneUser, updateUser,
} from '../../lib/controllers/userController';

const userHandler = async (req, res) => {
  switch (req.method) {
    case 'POST':
      await createNewUser(req, res);
      break;

    case 'GET':
      await getOneUser(req, res);
      break;

    case 'PUT':
      await updateUser(req, res);
      break;

    default:
      break;
  }
};

export default connectDB(userHandler);
