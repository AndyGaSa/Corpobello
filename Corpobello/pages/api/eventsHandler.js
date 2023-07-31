import connectDB from '../../config/mongoose.config';
import {
  createEvent,
  deleteEvent,
  getEvent,
} from '../../lib/controllers/eventsController';

const eventHandler = async (req, res) => {
  switch (req.method) {
    case 'POST':
      await createEvent(req, res);
      break;

    case 'GET':
      await getEvent(req, res);
      break;

    case 'DELETE':
      await deleteEvent(req, res);
      break;

    default:
      break;
  }
};

export default connectDB(eventHandler);
