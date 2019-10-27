import { Request, Response } from 'express';
import { TransactionRequest, TransactionResponse } from 'api/routes/transaction/types';
import createTransaction from 'domain/use_cases/createTransaction';
import withdrawWithQrCode from 'domain/use_cases/withdrawWithQrCode';

export async function createTransactionHandler(req: Request, res: Response): Promise<Response> {
  const request = req.body as TransactionRequest;
  try {
    const result: TransactionResponse = await createTransaction(request);
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ errors: err.toString() });
  }
}

export async function withdrawWithQrCodeHandler(req: Request, res: Response): Promise<Response> {
  // todo authorization secret id from atm..
  const {TRANSACTION_ID, QR_CODE} = req.body;
  try {
    const data = await withdrawWithQrCode(TRANSACTION_ID, QR_CODE);
    return res.json(data);
  } catch (err) {
    return res.status(400).json({errors: err.toString()});
  }
}
