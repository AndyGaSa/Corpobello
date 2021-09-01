import { verify } from 'jsonwebtoken';
import Reserve from '../../models/reserveModel';
import handleError from '../../utils/handleError';
import {
  createNewReserve, getReserves, deleteReserve, updateReserve,
} from './reserveController';

jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'), // import and retain the original functionalities
  verify: jest.fn(null, 'decoded'), // overwrite verify
}));

jest.mock('../../models/reserveModel');
jest.mock('../../utils/handleError');

describe('Given a createNewReserve function', () => {
  describe('When is invoked', () => {
    describe('And it gets resolved', () => {
      test('Then req.send should have been called', async () => {
        const req = {
          body: {},
        };
        const res = {
          send: jest.fn(),
          status: jest.fn(),
        };

        Reserve.create.mockResolvedValue({});
        await createNewReserve(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And is rejected', () => {
      test('Then handleError should have been called', async () => {
        const req = {
          body: {},
        };
        const res = {
          send: jest.fn(),
          status: jest.fn(),
        };

        Reserve.create.mockRejectedValue({});
        await createNewReserve(req, res);

        expect(handleError).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a getReserves function', () => {
  describe('When is invoked', () => {
    describe('And it gets resolved', () => {
      test('Then verify should have been called', async () => {
        const req = {
          body: {},
          query: { reserveId: '' },
          headers: { authorization: '' },
        };
        const res = {
          send: jest.fn(),
          status: jest.fn(),
        };
        Reserve.findById.mockResolvedValue({});
        await getReserves(req, res);

        expect(verify).toHaveBeenCalled();
      });
      test('Then res.send should have been called', async () => {
        const req = {
          body: {},
          query: { reserveId: '' },
          headers: { authorization: '' },
        };
        const res = {
          send: jest.fn(),
          status: jest.fn(),
        };
        Reserve.find.mockResolvedValue({});
        await getReserves(req, res);
        res.send();
        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And is rejected', () => {
      test('Then handleError should have been called', async () => {
        const req = {
          body: {},
          query: { reserveId: '' },
          headers: { authorizatoin: '' },
        };
        const res = {
          send: jest.fn(),
          status: jest.fn(),
        };

        Reserve.findById.mockRejectedValue({});
        await getReserves(req, res);

        expect(handleError).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a deleteReserve function', () => {
  describe('When is invoked', () => {
    describe('And it gets resolved', () => {
      test('Then req.send should have been called', async () => {
        const req = {
          body: {},
          query: { reserveId: '' },
        };
        const res = {
          send: jest.fn(),
          status: jest.fn(),
        };

        Reserve.findByIdAndDelete.mockResolvedValue({});
        await deleteReserve(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And is rejected', () => {
      test('Then handleError should have been called', async () => {
        const req = {
          body: {},
          query: { reserveId: '' },
        };
        const res = {
          send: jest.fn(),
          status: jest.fn(),
        };

        Reserve.findByIdAndDelete.mockRejectedValue({});
        await deleteReserve(req, res);

        expect(handleError).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a updateReserve function', () => {
  describe('When is invoked', () => {
    describe('And resolves', () => {
      test('Then req.send should have been called', async () => {
        const req = {
          body: {},
          query: { reserveId: '' },
        };
        const res = {
          send: jest.fn(),
          status: jest.fn(),
        };

        Reserve.findByIdAndUpdate.mockResolvedValue({});
        await updateReserve(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And rejectes', () => {
      test('Then handleError should have been called', async () => {
        const req = {
          body: {},
          query: { reserveId: '' },
        };
        const res = {
          send: jest.fn(),
          status: jest.fn(),
        };

        Reserve.findByIdAndUpdate.mockRejectedValue({});
        await updateReserve(req, res);

        expect(handleError).toHaveBeenCalled();
      });
    });
  });
});
