import connectDB from '../../config/mongoose.config';
import {
  logout,
} from '../../lib/controllers/userController';

const logoutHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      await logout(req, res);
      break;

    default:
      res.status(405).json({ message: 'This endpoint only support GET' });
      break;
  }
};
export default connectDB(logoutHandler);
