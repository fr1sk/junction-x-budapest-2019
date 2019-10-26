import {transactionRepository, userRepository} from 'gateways';
import {decrypt} from "root/src/lib/encryption";
import moment = require("root/node_modules/moment");

export async function withdrawWithQrCode(transaction_id: string, qr_code: string): Promise<void> {
    const qr_code_data = JSON.parse(decrypt(qr_code));
    const transaction = await transactionRepository.findByReservationIdAndQrCode(transaction_id, qr_code);
    const now = moment().utc();
    if (moment(qr_code_data.valid_until).isBefore(now) && transaction.type === 'RESERVE') {
        userRepository.decrementBalance(transaction.user, qr_code_data.amount);
        await transactionRepository.updateTransaction(transaction_id, {type: 'WITHDRAW'});
    } else {
        // rollback..
        throw new Error('QR code has expired or already used.');
    }
}

export default withdrawWithQrCode;
