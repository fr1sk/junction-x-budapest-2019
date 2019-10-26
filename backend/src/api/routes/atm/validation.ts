import { query } from 'express-validator';

export const atmQuery = [
  query('X').isNumeric(),
  query('Y').isNumeric(),
];
