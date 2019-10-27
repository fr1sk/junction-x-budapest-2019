import { body } from 'express-validator';

export const userValidation = [
  body('userId').isString(),
];
