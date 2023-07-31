import connectDB from '../../config/mongoose.config';
import {
  createNewReserve,
  getReserves,
  deleteReserve,
  updateReserve,
} from '../../lib/controllers/reserveController';

const reserveHandler = async (req, res) => {
  switch (req.method) {
    case 'POST':
      await createNewReserve(req, res);
      break;

    case 'GET':
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

export default connectDB(reserveHandler);
