import {atmRepository, transactionRepository} from 'gateways';
import {decrypt} from "root/src/lib/encryption";
import moment = require("root/node_modules/moment");

export async function withdrawWithQrCode(transaction_id: string, qr_code: string): Promise<void> {
  const qr_code_data = JSON.parse(decrypt(qr_code));
  const transaction = await transactionRepository.findByReservationIdAndQrCode(transaction_id, qr_code);
  const atm_id = transaction.atm;

  const now = moment().utc();
  if (moment(qr_code_data.valid_until).isBefore(now) && transaction.type === 'RESERVE') {
    const atm = await atmRepository.getAtm(atm_id);
    const nextBalance = atm.CURRENCY[transaction.currency_type] - qr_code_data.amount;
    // user..
    await atmRepository.updateAtm(atm_id, { balance: nextBalance });
    await transactionRepository.updateTransaction(transaction_id, { type: 'WITHDRAW' });
  } else {
    // rollback..
    throw new Error('QR code has expired or already used.');
  }
}

export default withdrawWithQrCode;
