import connectDB from '../../config/mongoose.config';
import {
  getCalendar,
  getReserves,
  deleteReserve,
  updateReserve,
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

    case 'GET':
      await getCalendar(req, res);
      break;
    default:
      break;
  }
};

export default connectDB(reserveHandlerUser);
