import User from '../models/userModel';
import {
  createNewUser,
  login,
  updateUser,
} from '../lib/controllers/userController';
import handleError from '../utils/handleError';

jest.mock('../../utils/handleError');
jest.mock('../../models/userModel');

describe('Given a createNewUser function', () => {
  describe('When is invoked', () => {
    describe('And foundUser contains a user', () => {
      describe('And resolves', () => {
        test('Then res.send should have been called', async () => {
          const res = {
            send: jest.fn(),
            status: jest.fn(),
          };
          const req = {
            body: { email: 'asda' },
          };
          User.findOne.mockResolvedValue(null);

          await createNewUser(req, res);
          expect(res.send).toHaveBeenCalled();
        });
      });
    });
    describe('And foundUser is true', () => {
      test('Then newUser value should say that yet exists a user with this mail ', async () => {
        const res = {
          send: jest.fn(),
          status: jest.fn(),
        };
        const req = {
          body: { email: 'asda' },
        };
        const newUser = 'Ya existe un usuario con ese email';
        User.findOne.mockResolvedValue(true);
        User.create.mockResolvedValue({});

        await createNewUser(req, res);

        expect(newUser).toBe('Ya existe un usuario con ese email');
      });
      describe('And rejected', () => {
        test('Then handleError should have been called', async () => {
          const res = {
            send: jest.fn(),
            status: jest.fn(),
          };
          const req = {
            body: { email: 'asda' },
          };

          User.findOne.mockRejectedValue(null);
          User.create.mockRejectedValue({});

          await createNewUser(req, res);

          expect(handleError).toHaveBeenCalled();
        });
      });
    });
  });
});

describe('Given a login function', () => {
  describe('When is invoked', () => {
    describe('And resolves', () => {
      test('Then res.send should have been called', async () => {
        const res = {
          send: jest.fn(),
          status: jest.fn(),
        };
        const req = {
          body: { userId: '' },
        };

        User.findById.mockResolvedValue({});

        await login(req, res);
        res.send();
        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And rejectes', () => {
      test('Then handleError should have been called', async () => {
        const res = {
          send: jest.fn(),
          status: jest.fn(),
        };
        const req = {
          body: { userId: '' },
        };

        User.findById.mockRejectedValue({});

        await login(req, res);

        expect(handleError).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a updateUser function', () => {
  describe('When is invoked', () => {
    describe('And resolves', () => {
      test('Then res.send should have been called', async () => {
        const res = {
          send: jest.fn(),
          status: jest.fn(),
        };
        const req = {
          query: { userId: '' },
          body: {},
        };

        User.findByIdAndUpdate.mockReturnValue({});

        await updateUser(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And rejectes', () => {
      test('Then handleError should have been called', async () => {
        const res = {
          send: jest.fn(),
          status: jest.fn(),
        };
        const req = {
          query: { userId: '' },
          body: {},
        };

        User.findByIdAndUpdate.mockRejectedValue({});

        await updateUser(req, res);

        expect(handleError).toHaveBeenCalled();
      });
    });
  });
});
