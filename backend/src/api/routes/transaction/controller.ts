import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { TransactionRequest, TransactionResponse } from 'api/routes/transaction/types';
import createTransaction from 'domain/use_cases/createTransaction';
import withdrawWithQrCode from "root/src/domain/use_cases/withdrawWithQrCode";

export async function createTransactionHandler(req: Request, res: Response): Promise<Response> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const request = req.body as TransactionRequest;
  try {
    const result: TransactionResponse = await createTransaction(request);
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errors: err.toString() });
  }
}

export async function withdrawWithQrCodeHandler(req: Request, res: Response): Promise<Response> {
  // todo authorization secret id from atm..
  const {TRANSACTION_ID, QR_CODE} = req.body;
  try {
    await withdrawWithQrCode(TRANSACTION_ID, QR_CODE);
    return res.status(400).json({errors: ['QR Code has expired or already used.']});
  } catch (err) {
    return res.status(400).json({errors: err.toString()});
  }
}
