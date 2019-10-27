import { Request, Response } from 'express';
import getBalance from 'domain/use_cases/getBalance';

export async function getBalanceHandler(req: Request, res: Response): Promise<Response> {
  const { userId } = req.body;
  
  try {
    const balance = await getBalance(userId);
    return res.json({ balance });
  } catch (err) {
    return res.status(400).json({ errors: err.toString() });
  }
}