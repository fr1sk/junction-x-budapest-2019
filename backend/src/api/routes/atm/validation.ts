import { query } from 'express-validator';

export const atmQuery = [
  query('longitude').isNumeric(),
  query('latitude').isNumeric(),
];
