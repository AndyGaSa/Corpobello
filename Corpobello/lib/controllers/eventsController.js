import Event from '../../models/eventsModel';
import handleError from '../../utils/handleError';

export async function createEvent(req, res) {
  try {
    const newEvent = await Event.create(req.body);
    res.send(newEvent);
    res.status(200);
  } catch (error) {
    handleError(error, res);
  }
}

export async function getEvent(req, res) {
  const { userId } = req.body;
  try {
    const foundEvent = await Event.find({ author: userId })
      .populate({
        path: 'author',
        select: 'name',
      });
    res.send(foundEvent);
    res.status(200);
  } catch (error) {
    handleError(error, res);
  }
}

export async function deleteEvent(req, res) {
  const { eventId } = req.body;
  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    res.send(deletedEvent);
  } catch (error) {
    handleError(error, res);
  }
}
