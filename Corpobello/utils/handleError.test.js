import handleError from './handleError';

describe('Given a handleError function', () => {
  describe('When is invoked', () => {
    test('Then res.send should have been called', () => {
      const res = {
        send: jest.fn(),
        status: jest.fn(),
      };

      handleError('', res);

      expect(res.send).toHaveBeenCalled();
    });
  });
});
