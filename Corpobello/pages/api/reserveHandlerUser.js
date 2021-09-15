import connectDB from '../../config/mongoose.config';
import {
  getReserves, deleteReserve, updateReserve,
} from '../../lib/controllers/reserveController';

const reserveHandlerUser = async (req, res) => {
  switch (req.method) {
    case 'POST':
      await getReserves(req, res);
      break;

    case 'DELETE':
      await deleteReserve(req, res);
      break;

    case 'PUT':
      await updateReserve(req, res);
      break;

    default:
      break;
  }
};

export default connectDB(reserveHandlerUser);
