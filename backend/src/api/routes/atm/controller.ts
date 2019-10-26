import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Location } from 'domain/entities/Location';
import { getAtmList } from 'domain/use_cases/getAtmList';

export async function getAtmListHandler(req: Request, res: Response): Promise<Response> {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const locationQuery = req.query;
  const location = locationQuery as Location;

  const atmList = await getAtmList(location);

  return res.json(atmList);
}
