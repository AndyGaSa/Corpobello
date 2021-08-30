import User from '../../models/userModel';
import {
  createNewUser, getOneUser, updateUser,
} from './userController';
import handleError from '../../utils/handleError';

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

          User.findOne.mockResolvedValue({});

          await createNewUser(req, res);

          expect(res.send).toHaveBeenCalled();
        });
      });
    });
    describe('And foundUser is null', () => {
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
          User.create.mockResolvedValue({});

          await createNewUser(req, res);

          expect(res.send).toHaveBeenCalled();
        });
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

describe('Given a getOneUser function', () => {
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

        await getOneUser(req, res);

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

        await getOneUser(req, res);

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
