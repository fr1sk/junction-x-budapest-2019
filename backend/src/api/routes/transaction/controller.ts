import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { CreateReservation, QrCode } from 'api/routes/transaction/types';
import createReservation from 'domain/use_cases/createReservation';

export async function createReservationHandler(req: Request, res: Response): Promise<Response> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const request = req.body as CreateReservation;
  try {
    const result: QrCode = await createReservation(request);
    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errors: err.toString() });
  }
}
