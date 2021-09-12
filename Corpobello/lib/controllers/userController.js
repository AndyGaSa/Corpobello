import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User from '../../models/userModel';
import handleError from '../../utils/handleError';

export async function createNewUser(req, res) {
  const { email } = req.body;
  let newUser;
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      newUser = 'Ya existe un usuario con ese email';
      res.status(409);
      res.send(newUser);
    } else {
      bcrypt.hash(req.body.password, 12, async (err, hash) => {
        if (err) {
          handleError(err);
          return;
        }
        req.body.password = await hash;
        newUser = User.create(req.body);
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
    const { _id } = foundUser;
    bcrypt.compare(req.body.password, foundUser.password, async (err, result) => {
      if (!err && result) {
        const data = { sub: _id, email };
        const jwt = await sign(data,
          process.env.jwt_secret,
          { expiresIn: '8h' });
        res.json({ authToken: jwt });
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
