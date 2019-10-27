import { body } from 'express-validator';

export const userValidation = [
  body('userId').isString().isLength({ min: 0 }),
];
