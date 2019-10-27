import {TransactionRequest, TransactionResponse} from 'api/routes/transaction/types';
import {encrypt} from 'lib/encryption';
import {atmRepository, transactionRepository} from 'gateways';
import {TransactionType} from 'domain/entities/Transaction';
import moment from 'moment';

export async function createTransaction(
  {
    CURRENCY, AMOUNT, ATM_ID, USER_ID, EST_TIME_IN_MINS,
  }: TransactionRequest,
): Promise<TransactionResponse> {

  const VALID_UNTIL = moment().add(EST_TIME_IN_MINS, 'minutes');
  const data = { CURRENCY, AMOUNT };

  const QR_CODE = encrypt(JSON.stringify(data));

  const transaction = {
    atm: ATM_ID,
    user: USER_ID,
    amount: AMOUNT,
    qr_code: QR_CODE,
    currency_type: CURRENCY,
    is_used: false,
    type: TransactionType.PRESERVE,
    valid_until: new Date(VALID_UNTIL.format()),
  };
  await atmRepository.decrementBalance(ATM_ID, transaction.currency_type, transaction.amount);
  try {
    const { _id } = await transactionRepository.createTransaction(transaction);
    return {TRANSACTION_ID: _id, QR_CODE, VALID_UNTIL};
  } catch(err){
    await atmRepository.incrementBalance(ATM_ID, transaction.currency_type, transaction.amount);
    throw new Error('Transaction failed')
  }
}

export default createTransaction;
