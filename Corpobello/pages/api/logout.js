import connectDB from '../../config/mongoose.config';
import {
  logout,
} from '../../lib/controllers/userController';

const logoutHandler = (req, res) => {
  if (req.method === 'GET') {
    logout(req, res);
  } else {
    res.status(405).json({ message: 'This endpoint only support GET' });
  }
};
export default connectDB(logoutHandler);
