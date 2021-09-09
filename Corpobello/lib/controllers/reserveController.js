/* eslint-disable no-param-reassign */
import { verify } from 'jsonwebtoken';
import Reserve from '../../models/reserveModel';
import Calendar from '../../models/calendarModel';
import handleError from '../../utils/handleError';

export async function createNewReserve({ body }, res) {
  try {
    const { service } = body;
    switch (service) {
      case 'Spa':
        body.date.time = 60;
        break;
      case 'Masaje':
        body.date.time = 60;
        break;
      case 'Peluqueria':
        body.date.time = 30;
        break;
      default:
        break;
    }
    // const newReserve = await Reserve.create(body);
    const dayExists = await Calendar.findOne({ day: body.date.day });
    let creation = {};
    if (dayExists === null) {
      const freeTimeRes = 600 - body.date.time;
      let hoursArray = [];
      if (body.date.time === 60 && +body.date.minute === 0) {
        hoursArray = [{
          hour: body.date.hour, minutes: [0, 30],
        }];
      } else if (body.date.time === 60 && +body.date.minute === 30) {
        hoursArray = [{
          hour: +body.date.hour, minutes: [30],
        },
        {
          hour: +body.date.hour + 1, minutes: [0],
        },
        ];
      } else if (body.date.time === 30) {
        hoursArray = [{
          hour: +body.date.hour, minutes: [+body.date.minute],
        },
        ];
      }
      creation = await Calendar.create(
        {
          day: body.date.day,
          hours: hoursArray,
          freeTime: freeTimeRes,
        },
      );
    } else {
      console.log(dayExists);
      dayExists.freeTime -= body.date.time;
      const hourExists = dayExists.hours.findIndex((hour) => {
        if (hour.hour === +body.date.hour) { return true; }
        return false;
      });
      if (hourExists !== -1) {
        console.log(dayExists.hours[hourExists]);
      }
    }
    res.send(creation);
    res.status(200);
  } catch (error) {
    handleError(error, res);
  }
}
export async function getReserves({ query }, res) {
  try {
    const foundReserve = await Reserve.find(query);
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
