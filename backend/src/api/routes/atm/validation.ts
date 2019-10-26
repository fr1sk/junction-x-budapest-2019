import { query } from 'express-validator';

export const atmQuery = [
  query('x').isNumeric(),
  query('y').isNumeric(),
];
