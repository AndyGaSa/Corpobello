import Event from '../models/eventsModel';
import handleError from '../utils/handleError';
import { createEvent, getEvent, deleteEvent } from '../lib/controllers/eventsController';

jest.mock('mongoose', () => ({
  ...jest.requireActual('mongoose'),
  connect: jest.fn().mockResolvedValue(),
}));
jest.mock('../models/eventsModel');
jest.mock('../utils/handleError');

describe('Given a createEvent function', () => {
  describe('When is invoked', () => {
    describe('And resolves', () => {
      test('Then res.send should have been called', async () => {
        const req = {
          body: {},
        };
        const res = {
          send: jest.fn(),
          status: jest.fn(),
        };

        Event.create.mockResolvedValue({});
        await createEvent(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And rejectes', () => {
      test('Then res.send should have been called', async () => {
        const req = {
          body: {},
        };
        const res = {
          send: jest.fn(),
          status: jest.fn(),
        };

        Event.create.mockRejectedValue({});
        await createEvent(req, res);

        expect(handleError).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a getEvent function', () => {
  describe('When is invoked', () => {
    describe('And resolves', () => {
      test('Then res.send should have been called', async () => {
        const req = {
          body: { userId: '612cf9b35e57cf0e5d389876' },
        };
        const res = {
          send: jest.fn(),
          status: jest.fn(),
        };

        const foundEvent = Event.find.mockResolvedValue({});
        res.send(foundEvent);
        await getEvent(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And rejectes', () => {
      test('Then handleError should have been called', async () => {
        const req = {
          body: {},
          query: {},
        };
        const res = {
          send: jest.fn(),
          status: jest.fn(),
        };

        Event.findById.mockRejectedValue({});
        await getEvent(req, res);

        expect(handleError).toHaveBeenCalled();
      });
    });
  });
});

describe('Given a deleteEvent function', () => {
  describe('When is invoked', () => {
    describe('And resolves', () => {
      test('Then res.send should have been called', async () => {
        const req = {
          body: {},
          query: {},
        };
        const res = {
          send: jest.fn(),
          status: jest.fn(),
        };

        Event.findByIdAndDelete.mockResolvedValue({});
        await deleteEvent(req, res);

        expect(res.send).toHaveBeenCalled();
      });
    });
    describe('And rejectes', () => {
      test('Then handleError should have been called', async () => {
        const req = {
          body: {},
          query: {},
        };
        const res = {
          send: jest.fn(),
          status: jest.fn(),
        };

        Event.findByIdAndDelete.mockRejectedValue({});
        await deleteEvent(req, res);

        expect(handleError).toHaveBeenCalled();
      });
    });
  });
});
