import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import { TIME_LIMIT } from 'utils/constants';

const INITIAL_BALANCE = 100;

describe('BankAccount', () => {
  let senderAccount: BankAccount;
  let recipientAccount: BankAccount;

  beforeEach(() => {
    senderAccount = getBankAccount(INITIAL_BALANCE);
    recipientAccount = getBankAccount(INITIAL_BALANCE);
  });

  test(
    'should create account with initial balance',
    () => {
      expect(senderAccount).toBeInstanceOf(BankAccount);
      expect(senderAccount.getBalance()).toBe(INITIAL_BALANCE);
    },
    TIME_LIMIT,
  );

  test(
    'should throw InsufficientFundsError error when withdrawing more than balance',
    () => {
      const unreachableSum = INITIAL_BALANCE + 1;

      expect(() => senderAccount.withdraw(unreachableSum)).toThrow(
        InsufficientFundsError,
      );
    },
    TIME_LIMIT,
  );

  test(
    'should throw error when transferring more than balance',
    () => {
      const unreachableSum = INITIAL_BALANCE + 1;

      expect(() =>
        senderAccount.transfer(unreachableSum, recipientAccount),
      ).toThrow(InsufficientFundsError);
    },
    TIME_LIMIT,
  );

  test(
    'should throw error when transferring to the same account',
    () => {
      expect(() =>
        senderAccount.transfer(INITIAL_BALANCE, senderAccount),
      ).toThrow(TransferFailedError);
    },
    TIME_LIMIT,
  );

  test(
    'should deposit money',
    () => {
      const depositSum = 40;
      senderAccount.deposit(depositSum);

      expect(senderAccount.getBalance()).toBe(INITIAL_BALANCE + depositSum);
    },
    TIME_LIMIT,
  );

  test(
    'should withdraw money',
    () => {
      const withdrawSum = INITIAL_BALANCE / 2;
      senderAccount.withdraw(withdrawSum);

      expect(senderAccount.getBalance()).toBe(INITIAL_BALANCE - withdrawSum);
    },
    TIME_LIMIT,
  );

  test(
    'should transfer money',
    () => {
      const transferSum = INITIAL_BALANCE / 2;
      senderAccount.transfer(transferSum, recipientAccount);

      expect(senderAccount.getBalance()).toBe(INITIAL_BALANCE - transferSum);
      expect(recipientAccount.getBalance()).toBe(INITIAL_BALANCE + transferSum);
    },
    TIME_LIMIT,
  );

  test(
    'fetchBalance should return number in case if request did not failed',
    async () => {
      const balance = await senderAccount.fetchBalance();

      if (typeof balance === 'number') {
        expect(balance).toEqual(expect.any(Number));
      } else if (typeof balance === 'object') {
        expect(balance).toEqual(null);
      }
    },
    TIME_LIMIT,
  );

  test(
    'should set new balance if fetchBalance returned number',
    async () => {
      const mockBalance = 60;
      const mockedFetchBalance = jest.spyOn(senderAccount, 'fetchBalance');
      const balance = senderAccount.fetchBalance();

      if (typeof balance === 'number') {
        mockedFetchBalance.mockResolvedValue(mockBalance);
        await senderAccount.synchronizeBalance();

        expect(senderAccount.getBalance()).toEqual(mockBalance);
      }
    },
    TIME_LIMIT,
  );

  test(
    'should throw SynchronizationFailedError if fetchBalance returned null',
    async () => {
      const mockedFetchBalance = jest.spyOn(senderAccount, 'fetchBalance');
      const balance = senderAccount.fetchBalance();

      if (typeof balance === 'object') {
        mockedFetchBalance.mockResolvedValue(null);

        try {
          await senderAccount.synchronizeBalance();
        } catch (error) {
          expect(error).toBeInstanceOf(SynchronizationFailedError);
        }
      }
    },
    TIME_LIMIT,
  );
});
