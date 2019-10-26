import { CreateReservation } from 'api/routes/transaction/types';
import { encrypt } from 'lib/encryption';
import {atmRepository, transactionRepository} from 'gateways';
import moment, { Moment } from 'moment';
import { TransactionType } from 'domain/entities/Transaction';

export async function createReservation(
  {
    currency, amount, atm_id, user_id, estimated_time_in_mins,
  }: CreateReservation,
): Promise<{qr_code: string, valid_until: Moment}> {

  const valid_until = moment().utc().add(estimated_time_in_mins, 'minutes');
  const data = {currency, amount, valid_until};

  const qr_code = encrypt(JSON.stringify(data));

  const transaction = {
    atm: atm_id,
    user: user_id,
    amount,
    qr_code,
    currency_type: currency,
    is_used: false,
    type: TransactionType.WITHDRAW,
<<<<<<< HEAD
    valid_until: new Date(valid_until.format()),
=======
    valid_until,
>>>>>>> b8d490da00e6130351547b0a1cbd4ce74670a9b9
  };

  const atm = await atmRepository.getAtm(atm_id);
  const nextBalance = atm.CURRENCY[currency] - amount;
  await atmRepository.updateAtm(atm_id, { balance: nextBalance });
  await transactionRepository.createTransaction(transaction);
  // todo retry or rollback...
  return {
    qr_code,
    valid_until,
  };
}

export default createReservation;
