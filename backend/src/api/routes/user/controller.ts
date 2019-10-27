import { Request, Response } from 'express';
import getBalance from 'domain/use_cases/getBalance';

export async function getBalanceHandler(req: Request, res: Response): Promise<Response> {
  const { userId } = req.body;

  try {
    const user = await getBalance(userId);
    if (!req.cookies.user) {
      res.cookie('user', user._id, { maxAge: 900000 });
    }

    return res.json({ balance: user.balance });
  } catch (err) {
    return res.status(400).json({ errors: err.toString() });
  }
}