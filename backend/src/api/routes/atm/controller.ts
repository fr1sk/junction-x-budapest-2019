import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Location } from 'domain/entities/Location';
import { getAtmList } from 'domain/use_cases/getAtmList';
import { AtmFilter } from 'domain/entities';
import { getRecommendedAtms } from 'domain/use_cases/getRecommendedAtms';
import mapDistance from '../../../lib/mapMatrix'

export async function getAtmListHandler(req: Request, res: Response): Promise<Response> {
  const locationQuery = req.query;
  const location = locationQuery as Location;

  const atmList = await getAtmList(location);

  return res.json(atmList);
}

export async function getRecommendedAtmsHandler(req: Request, res: Response): Promise<Response> {
  const location = {
    X: req.body.X || 23,
    Y: req.body.Y || 24,
  }
  const atmFilter: AtmFilter = {
    deposit: req.body.deposit || false,
    location: location,
    amount: req.body.amount || 0,
    currency: req.body.currency || 'HUF',
  };
  
  const atmList = await getRecommendedAtms(atmFilter);
  console.log(req.body);
  const _atms = await Promise.all(atmList.map(async (a, i) => {
    const matrixDistanceData = await mapDistance(
      { lat: req.body.X, lng: req.body.Y }, { lat: a.LOCATION.X, lng: a.LOCATION.Y }
    );
    const realTimeDistance = matrixDistanceData[0].mapFound ? Math.round(matrixDistanceData[0].duration.value / 60) : 15;
    return { ...a, EST_TIME_IN_MINS: realTimeDistance + 1 }
  }));

  return res.json(_atms.sort((a, b) => a.EST_TIME_IN_MINS - b.EST_TIME_IN_MINS));
}
