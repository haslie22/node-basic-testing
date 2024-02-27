import axios from 'axios';

import { throttledGetDataFromApi, THROTTLE_TIME } from './index';
import { TIME_LIMIT } from 'utils/constants';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const API_URL = '/api';

const data = {
  name: 'John Doe',
  age: 30,
};

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    const returnMock = {
      get: jest.fn().mockResolvedValue({ data }),
    };

    axios.create = jest.fn().mockReturnValue(returnMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test(
    'should create instance with provided base url',
    async () => {
      await throttledGetDataFromApi('/test-path');

      expect(axios.create).toHaveBeenCalledWith({
        baseURL: BASE_URL,
      });
    },
    TIME_LIMIT,
  );

  test(
    'should perform request to correct provided url',
    async () => {
      await throttledGetDataFromApi(API_URL);

      jest.advanceTimersByTime(THROTTLE_TIME);

      expect(axios.create().get).toHaveBeenCalledWith(API_URL);
    },
    TIME_LIMIT,
  );

  test(
    'should return response data',
    async () => {
      const resolvedData = await throttledGetDataFromApi(API_URL);

      jest.advanceTimersByTime(THROTTLE_TIME);

      expect(resolvedData).toEqual(data);
    },
    TIME_LIMIT,
  );
});
