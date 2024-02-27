import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';
import { TIME_LIMIT } from 'utils/constants';

describe('resolveValue', () => {
  test(
    'should resolve provided value',
    async () => {
      const testValue = 'lemon pie';
      const result = await resolveValue(testValue);
      expect(result).toBe(testValue);
    },
    TIME_LIMIT,
  );
});

describe('throwError', () => {
  test(
    'should throw error with provided message',
    () => {
      const errorMessage = 'rotten potato';
      expect(() => throwError(errorMessage)).toThrow(errorMessage);
    },
    TIME_LIMIT,
  );

  test(
    'should throw error with default message if message is not provided',
    () => {
      expect(throwError).toThrow(new Error('Oops!'));
    },
    TIME_LIMIT,
  );
});

describe('throwCustomError', () => {
  test(
    'should throw custom error',
    () => {
      expect(throwCustomError).toThrow(MyAwesomeError);
    },
    TIME_LIMIT,
  );
});

describe('rejectCustomError', () => {
  test(
    'should reject custom error',
    async () => {
      try {
        await rejectCustomError();
      } catch (error) {
        expect(error).toBeInstanceOf(MyAwesomeError);
      }
    },
    TIME_LIMIT,
  );
});
