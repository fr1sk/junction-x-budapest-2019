import {CurrencyType} from "root/src/api/routes/transaction/types";
import {atmRepository, transactionRepository} from "root/src/gateways";

export async function undoReservation(atm_id: string, currency: CurrencyType, transaction_id: string){

    const transaction = await transactionRepository.findOneById(transaction_id);
    transactionRepository.updateTransaction(transaction_id, {
        used: true
    });

    // const atm = await atmRepository.getAtm(atm_id);
    // const balance = atm.balance - transaction.;
    // atmRepository.updateAtm(atm_id, {
    //
    // })


    /// res
//
}
