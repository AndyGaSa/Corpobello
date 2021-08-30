import Reserve from '../../models/reserveModel';
import handleError from '../../utils/handleError';

export async function createNewReserve(req, res) {
  try {
    const newReserve = await Reserve.create(req.body);
    res.send(newReserve);
    res.status(200);
  } catch (error) {
    handleError(error, res);
  }
}

export async function getReserves(req, res) {
  const { userEmail } = req.body;
  try {
    const foundReserve = await Reserve.find({ email: userEmail });
    res.send(foundReserve);
    res.status(200);
  } catch (error) {
    handleError(error, res);
  }
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
