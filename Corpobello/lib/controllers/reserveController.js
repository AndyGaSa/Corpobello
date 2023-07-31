/* eslint-disable no-param-reassign */
import { verify } from 'jsonwebtoken';
import Reserve from '../../models/reserveModel';
import Calendar from '../../models/calendarModel';
import handleError from '../../utils/handleError';
import createCalendarArray from '../../utils/createCalendarArray';

export async function createNewReserve({ body }, res) {
  try {
    const { service } = body;
    switch (service) {
      case 'spa':
        body.date.time = 60;
        break;
      case 'massage':
        body.date.time = 60;
        break;
      case 'haircut':
        body.date.time = 30;
        break;
      default:
        break;
    }
    await Reserve.create(body);
    const dayExists = await Calendar.findOne({ day: body.date.day });
    let creation = {};
    if (dayExists === null) {
      const freeTimeRes = 600 - body.date.time;
      const hoursArray = createCalendarArray(body);
      creation = await Calendar.create(
        {
          day: body.date.day,
          hoursAndMinutes: hoursArray,
          freeTime: freeTimeRes,
        },
      );
    } else {
      const freeTimeRes = dayExists.freeTime - body.date.time;
      const hoursArray = createCalendarArray(body);
      const { _id } = dayExists;
      creation = await Calendar.findOneAndUpdate(
        { _id }, {
          $push: {
            hoursAndMinutes: hoursArray,
          },
          freeTime: freeTimeRes,
        },
      );
    }
    res.send(creation);
    res.status(200);
  } catch (error) {
    handleError(error, res);
  }
}
export async function getReserves(req, res) {
  try {
    if (req.body.email === undefined) {
      const foundReserve = await Reserve.find(req.query);
      res.send(foundReserve);
      return res.status(200);
    }
    const foundReserve = await Reserve.find({ email: req.body.email });
    res.send(foundReserve);
    return res.status(200);
  } catch (error) {
    return handleError(error, res);
  }
}
export async function getCalendar(req, res) {
  try {
    const foundReserve = await Calendar.find(req.query);
    res.send(foundReserve);
    return res.status(200);
  } catch (error) {
    return handleError(error, res);
  }
}
export function getReservesAuthorized(req, res) {
  const { userEmail } = req.body;
  const { authorization } = req.headers;
  verify(authorization, process.env.jwt_secret, async (err, decoded) => {
    try {
      if (!err && decoded) {
        const foundReserve = await Reserve.find({ email: userEmail });
        res.send(foundReserve);
        return res.status(200);
      }
      res.status(500).json({ message: 'Sorry you are not authenticated' });
      return new Error('Bad authentication');
    } catch (error) {
      return handleError(error, res);
    }
  });
}

export async function deleteReserve(req, res) {
  const { reserveId } = req.body;
  try {
    const deletedUser = await Reserve.findByIdAndDelete(reserveId);
    res.send(`tu reserva para el dia ${deletedUser.date} ha sido cancelada`);
    res.status(200);
  } catch (error) {
    handleError(error, res);
  }
}

export async function updateReserve(req, res) {
  const { reserveId } = req.body;
  const dataToUpdate = req.body.date;
  try {
    const updatedUser = await Reserve.findByIdAndUpdate(
      reserveId,
      { date: dataToUpdate },
      { new: true },
    );
    res.send(updatedUser);
    res.status(200);
  } catch (error) {
    handleError(error, res);
  }
}
