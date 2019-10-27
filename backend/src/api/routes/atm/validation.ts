import { query, body } from 'express-validator';

export const atmQuery = [
  query('x').isNumeric(),
  query('y').isNumeric(),
];

export const recommendedAtmQuery = [
  body('x').isNumeric(),
  body('y').isNumeric(),
];
