import { generateLinkedList } from './index';
import { TIME_LIMIT } from 'utils/constants';

const listItems = ['apple', 'banana', 'orange', 'grape'];

const predefinedList = {
  value: listItems[0],
  next: {
    value: listItems[1],
    next: {
      value: listItems[2],
      next: {
        value: listItems[3],
        next: {
          value: null,
          next: null,
        },
      },
    },
  },
};

describe('generateLinkedList', () => {
  test(
    'should generate linked list from values 1',
    () => {
      expect(generateLinkedList(listItems)).toStrictEqual(predefinedList);
    },
    TIME_LIMIT,
  );

  test(
    'should generate linked list from values 2',
    () => {
      expect(generateLinkedList(listItems)).toMatchSnapshot();
    },
    TIME_LIMIT,
  );
});
