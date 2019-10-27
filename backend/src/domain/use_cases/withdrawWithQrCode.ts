import { transactionRepository, userRepository } from 'gateways';
import { decrypt } from 'lib/encryption';
import moment from 'moment';
import {Transaction} from "domain/entities";

export async function withdrawWithQrCode(transaction_id: string, qr_code: string): Promise<Transaction> {

    JSON.parse(decrypt(qr_code)); // CURRENCY + AMOUNT

    const transaction = await transactionRepository.findByReservationIdAndQrCode(transaction_id, qr_code);
    const now = moment();

    const valid_until = moment(transaction.valid_until);
    if (now.isBefore(valid_until) && transaction.type === 'RESERVE') {
        await userRepository.decrementBalance(transaction.user, transaction.amount);
        return transactionRepository.updateTransaction(transaction_id, {type: 'WITHDRAW'});
    } else {
        // rollback..
        throw new Error('QR code has expired or already used.');
    }
}

export default withdrawWithQrCode;
