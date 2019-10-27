import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {Location} from 'domain/entities/Location';
import { getAtmList } from 'domain/use_cases/getAtmList';
import { AtmFilter } from 'domain/entities';
import { getRecommendedAtms } from 'domain/use_cases/getRecommendedAtms';

export async function getAtmListHandler(req: Request, res: Response): Promise<Response> {
  const locationQuery = req.query;
  const location = locationQuery as Location;

  const atmList = await getAtmList(location);

  return res.json(atmList);
}

export async function getRecommendedAtmsHandler(req: Request, res: Response): Promise<Response> {
  const atmFilter: AtmFilter = {
    deposit: req.body.deposit || false,
    location: req.body.location || {X:23,Y:24},
    amount: req.body.amount || 0,
    currency: req.body.currency || 'HUF',
  };

  const atmList = await getRecommendedAtms(atmFilter);
  const _atms = atmList.map((a, i) => ({...a, EST_TIME_IN_MINS: 15 + i}));

  return res.json(_atms);
}
