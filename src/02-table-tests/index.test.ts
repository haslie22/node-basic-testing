import { simpleCalculator, Action } from './index';
import { TIME_LIMIT } from 'utils/constants';

const testCases = [
  {
    message: 'should add two numbers',
    a: 2,
    b: 6,
    action: Action.Add,
    expected: 8,
  },
  {
    message: 'should subtract two numbers',
    a: 12,
    b: 8,
    action: Action.Subtract,
    expected: 4,
  },
  {
    message: 'should multiply two numbers',
    a: 7,
    b: 6,
    action: Action.Multiply,
    expected: 42,
  },
  {
    message: 'should divide two numbers',
    a: 24,
    b: 4,
    action: Action.Divide,
    expected: 6,
  },
  {
    message: 'should exponentiate two numbers',
    a: 2,
    b: 8,
    action: Action.Exponentiate,
    expected: 256,
  },
  {
    message: 'should return null for invalid action',
    a: 4,
    b: 16,
    action: 'Drink coffee',
    expected: null,
  },
  {
    message: 'should return null for invalid arguments',
    a: 2,
    b: '8',
    action: Action.Multiply,
    expected: null,
  },
  {
    message: 'should return null for invalid arguments',
    a: 2,
    b: BigInt(8),
    action: Action.Multiply,
    expected: null,
  },
  {
    message: 'should return null for invalid arguments',
    a: 2,
    b: [8],
    action: Action.Multiply,
    expected: null,
  },
  {
    message: 'should return null for invalid arguments',
    a: 2,
    b: { b: 8 },
    action: Action.Multiply,
    expected: null,
  },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    `$message`,
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
    TIME_LIMIT,
  );
});
