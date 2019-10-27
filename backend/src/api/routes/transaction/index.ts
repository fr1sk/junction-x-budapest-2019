import { Router } from 'express';
import { validationMiddleware } from 'lib/validationMiddleware';
import * as transactionController from './controller';
import { transactionQuery } from './validation';

const routes = Router();

routes.post('/', transactionQuery, validationMiddleware, transactionController.createTransactionHandler);
routes.post('/withdraw', transactionController.withdrawWithQrCodeHandler);


export default routes;
