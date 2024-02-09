import { simpleCalculator, Action } from './index';
import { TIME_LIMIT } from 'utils/constants';

describe('simpleCalculator tests', () => {
  test(
    'should add two numbers',
    () => {
      expect(
        simpleCalculator({
          a: 2,
          b: 6,
          action: Action.Add,
        }),
      ).toBe(8);
    },
    TIME_LIMIT,
  );

  test(
    'should subtract two numbers',
    () => {
      expect(
        simpleCalculator({
          a: 12,
          b: 8,
          action: Action.Subtract,
        }),
      ).toBe(4);
    },
    TIME_LIMIT,
  );

  test(
    'should multiply two numbers',
    () => {
      expect(
        simpleCalculator({
          a: 7,
          b: 6,
          action: Action.Multiply,
        }),
      ).toBe(42);
    },
    TIME_LIMIT,
  );

  test(
    'should divide two numbers',
    () => {
      expect(
        simpleCalculator({
          a: 24,
          b: 4,
          action: Action.Divide,
        }),
      ).toBe(6);
    },
    TIME_LIMIT,
  );

  test(
    'should exponentiate two numbers',
    () => {
      expect(
        simpleCalculator({
          a: 2,
          b: 8,
          action: Action.Exponentiate,
        }),
      ).toBe(256);
    },
    TIME_LIMIT,
  );

  test(
    'should return null for invalid action',
    () => {
      expect(
        simpleCalculator({
          a: 4,
          b: 16,
          action: 'Drink coffee',
        }),
      ).toBeNull();
    },
    TIME_LIMIT,
  );

  test(
    'should return null for invalid arguments',
    () => {
      expect(
        simpleCalculator({
          a: 2,
          b: '8',
          action: Action.Multiply,
        }),
      ).toBeNull();

      expect(
        simpleCalculator({
          a: 2,
          b: BigInt(8),
          action: Action.Multiply,
        }),
      ).toBeNull();

      expect(
        simpleCalculator({
          a: 2,
          b: [8],
          action: Action.Multiply,
        }),
      ).toBeNull();

      expect(
        simpleCalculator({
          a: 2,
          b: { b: 8 },
          action: Action.Multiply,
        }),
      ).toBeNull();
    },
    TIME_LIMIT,
  );
});
