import {atmRepository, transactionRepository} from "root/src/gateways";

export async function undoReservation(atm_id: string, transaction_id: string){
    const transaction = await transactionRepository.findOneById(transaction_id);
    await transactionRepository.updateTransaction(transaction_id, {
        is_used: true
    });
    await atmRepository.incrementBalance(atm_id, transaction.currency_type, transaction.amount);
}
