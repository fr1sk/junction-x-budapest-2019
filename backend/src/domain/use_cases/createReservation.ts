import { CreateReservation } from 'api/routes/transaction/types';
import { encrypt } from 'lib/encryption';
import { transactionRepository } from 'gateways';
import moment, { Moment } from 'moment';
import { TransactionType } from 'domain/entities/Transaction';

export async function createReservation(
  {
    currency, amount, atm_id, user_id, estimated_time_in_mins,
  }: CreateReservation,
): Promise<{qr_code: string, valid_until: Moment}> {
  const valid_until = moment().utc().add(estimated_time_in_mins, 'minutes');
  const data = {
    currency,
    amount,
    valid_until,
  };

  const qr_code = encrypt(JSON.stringify(data));
  console.log(qr_code);

  const transaction = {
    atm: atm_id,
    user: user_id,
    amount,
    qr_code,
    type: TransactionType.WITHDRAW,
  };

  await transactionRepository.createTransaction(transaction);

  return {
    qr_code,
    valid_until,
  };
}

export default createReservation;
