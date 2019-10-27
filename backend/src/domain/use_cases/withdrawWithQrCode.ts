import { TransactionResponse } from 'domain/entities';
import { transactionRepository, userRepository } from 'gateways';
import { decrypt } from 'lib/encryption';
import moment from 'root/node_modules/moment';

export async function withdrawWithQrCode(transaction_id: string, qr_code: string): Promise<TransactionResponse> {
  JSON.parse(decrypt(qr_code)); // CURRENCY + AMOUNT
  const transaction = await transactionRepository.findByReservationIdAndQrCode(transaction_id, qr_code);
  const now = moment();

  const valid_until = moment(transaction.valid_until);
  if (now.isBefore(valid_until) && transaction.type === 'RESERVE') {
    await userRepository.decrementBalance(transaction.user, transaction.amount);
    await transactionRepository.updateTransaction(transaction_id, { type: 'WITHDRAW' });
    return {
      success: true,
      type: 'withdraw',
      amount: transaction.amount,
      currency: transaction.currency_type,
    };
  } if (transaction.type === 'DEPOSIT') {
    // await userRepository.incrementBalance(transaction.user, transaction.amount);
    return {
      success: true,
      type: 'deposit',
      currency: transaction.currency_type,
    };
  }
  return {
    success: false,
    type: 'QR code expired or already used',
  };
}

export default withdrawWithQrCode;
