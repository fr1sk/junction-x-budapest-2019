import { TransactionRequest } from 'api/routes/transaction/types';
import { encrypt } from 'lib/encryption';
import {atmRepository, transactionRepository} from 'gateways';
import moment, { Moment } from 'moment';
import { TransactionType } from 'domain/entities/Transaction';
import {undoReservation} from "root/src/domain/use_cases/undoReservation";

export async function createTransaction(
  {
    CURRENCY, AMOUNT, ATM_ID, USER_ID, EST_TIME_IN_MINS,
  }: TransactionRequest,
): Promise<{qr_code: string, valid_until: Moment}> {

  const valid_until = moment().utc().add(EST_TIME_IN_MINS, 'minutes');
  const data = {CURRENCY, AMOUNT};

  const qr_code = encrypt(JSON.stringify(data));

  const transaction = {
    atm: ATM_ID,
    user: USER_ID,
    amount: AMOUNT,
    qr_code,
    currency_type: CURRENCY,
    is_used: false,
    type: TransactionType.WITHDRAW,
    valid_until: new Date(valid_until.format()),
  };

  const atm = await atmRepository.getAtm(ATM_ID);
  const nextBalance = atm.CURRENCY[CURRENCY] - AMOUNT;
  await atmRepository.updateAtm(ATM_ID, { balance: nextBalance });

  try {
    await transactionRepository.createTransaction(transaction);
    return {qr_code, valid_until};
  } catch(err){
    await atmRepository.decrementBalace(ATM_ID, transaction.currency_type, transaction.amount);
    throw new Error('Transaction failed')
  }
}

export default createTransaction;
