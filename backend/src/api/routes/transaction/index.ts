import { Router } from 'express';
import * as transactionController from './controller';
import { transactionQuery } from './validation';

const routes = Router();

// todo add swagger
routes.post('/reserve', transactionQuery, transactionController.createReservationHandler);

export default routes;
