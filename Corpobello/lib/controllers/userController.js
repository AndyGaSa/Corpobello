import bcrypt from 'bcrypt';
import User from '../../models/userModel';
import handleError from '../../utils/handleError';

export async function createNewUser(req, res) {
  const { email } = req.body;
  let newUser;
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      newUser = 'Ya existe un usuario con ese email';
    } else {
      bcrypt.hash(req.body.password, 12, async (err, hash) => {
        if (err) {
          console.error(err);
          return;
        }
        req.body.password = await hash;
        newUser = await User.create(req.body);
        res.status(200);
        res.send(newUser);
      });
    }
  } catch (error) {
    handleError(error, res);
  }
}

export async function login(req, res) {
  const { email } = req.body;
  try {
    const foundUser = await User.findOne({ email });
    console.log(foundUser);
    bcrypt.compare(req.body.password, foundUser.password, (err, result) => {
      if (!err && result) {
        res.send(foundUser);
        res.status(200);
      } else {
        res.json({ message: 'Ups, something went wrong!' });
        res.status(401);
      }
    });
  } catch (error) {
    handleError(error, res);
  }
}

export async function updateUser(req, res) {
  const { userId } = req.body;
  const dataToUpdate = req.body.password;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: dataToUpdate },
      { new: true },
    );
    res.send(updatedUser);
    res.status(200);
  } catch (error) {
    handleError(error, res);
  }
}
