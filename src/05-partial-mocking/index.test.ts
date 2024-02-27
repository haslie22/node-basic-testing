import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';
import { TIME_LIMIT } from 'utils/constants';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    __esModule: true,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log');
  });

  afterAll(() => {
    jest.unmock('./index');
  });

  test(
    'mockOne, mockTwo, mockThree should not log into console',
    () => {
      mockOne();
      mockTwo();
      mockThree();
      expect(consoleSpy).not.toHaveBeenCalled();
    },
    TIME_LIMIT,
  );

  test(
    'unmockedFunction should log into console',
    () => {
      const consoleOutput = 'I am not mocked';

      unmockedFunction();

      expect(consoleSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledWith(consoleOutput);
    },
    TIME_LIMIT,
  );
});
