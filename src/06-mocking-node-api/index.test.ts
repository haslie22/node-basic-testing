import path from 'path';
import fs from 'fs';

import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import { TIME_LIMIT } from 'utils/constants';

const TEST_TIME = 1000;
const PATH_TO_FILE = './test.txt';
const FILE_CONTENT = 'Test file content';

const mockedCb = jest.fn();

describe('doStuffByTimeout', () => {
  let spySetTimeout: jest.SpyInstance;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    spySetTimeout = jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(mockedCb, TEST_TIME);

    expect(spySetTimeout).toBeCalled();
    expect(spySetTimeout).toBeCalledTimes(1);
    expect(spySetTimeout).toBeCalledWith(mockedCb, TEST_TIME);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(mockedCb, TEST_TIME);

    expect(mockedCb).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(mockedCb).toHaveBeenCalled();
    expect(mockedCb).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  let spySetInterval: jest.SpyInstance;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    spySetInterval = jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  test(
    'should set interval with provided callback and timeout',
    () => {
      doStuffByInterval(mockedCb, TEST_TIME);

      expect(spySetInterval).toBeCalled();
      expect(spySetInterval).toBeCalledTimes(1);
      expect(spySetInterval).toBeCalledWith(mockedCb, TEST_TIME);
    },
    TIME_LIMIT,
  );

  test('should call callback multiple times after multiple intervals', () => {
    const intervalsNum = 5;

    doStuffByInterval(mockedCb, TEST_TIME);
    jest.advanceTimersByTime(TEST_TIME * intervalsNum);

    expect(mockedCb).toHaveBeenCalledTimes(intervalsNum);
  });
});

describe('readFileAsynchronously', () => {
  let spyPath: jest.SpyInstance;
  let spyReadFile: jest.SpyInstance;
  let spyExistsSync: jest.SpyInstance;

  beforeEach(() => {
    spyPath = jest.spyOn(path, 'join');
    spyReadFile = jest.spyOn(fs.promises, 'readFile');
    spyExistsSync = jest.spyOn(fs, 'existsSync');
  });

  test(
    'should call join with pathToFile',
    async () => {
      await readFileAsynchronously(PATH_TO_FILE);

      expect(spyPath).toHaveBeenCalled();
      expect(spyPath).toHaveBeenCalledTimes(1);
      expect(spyPath).toHaveBeenCalledWith(__dirname, PATH_TO_FILE);
    },
    TIME_LIMIT,
  );

  test(
    'should return null if file does not exist',
    async () => {
      const res = await readFileAsynchronously('notExistingFile.txt');
      expect(res).toBeNull();
    },
    TIME_LIMIT,
  );

  test(
    'should return file content if file exists',
    async () => {
      spyExistsSync.mockReturnValueOnce(true);
      spyReadFile.mockResolvedValueOnce(FILE_CONTENT);

      const result = await readFileAsynchronously('existingfile.txt');
      expect(result).toBe(FILE_CONTENT);
    },
    TIME_LIMIT,
  );
});
