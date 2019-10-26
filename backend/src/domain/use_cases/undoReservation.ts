import {atmRepository, transactionRepository} from "root/src/gateways";

export async function undoReservation(atm_id: string, transaction_id: string){
    const transaction = await transactionRepository.findOneById(transaction_id);
    await transactionRepository.updateTransaction(transaction_id, {
        is_used: true
    });
    const currency = "EUR";
    await atmRepository.incrementBalance(atm_id, currency, transaction.amount);
}
