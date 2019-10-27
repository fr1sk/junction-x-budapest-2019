import {atmRepository, transactionRepository} from 'gateways';

export async function undoReservation(atm_id: string, transaction_id: string){
    const transaction = await transactionRepository.getTransaction(transaction_id);
    await transactionRepository.updateTransaction(transaction_id, {
        is_used: true
    });
    await atmRepository.incrementBalance(atm_id, transaction.currency_type, transaction.amount);
}
