import {Router} from 'express';
import * as transactionController from './controller';
import { transactionQuery } from './validation';
import { validationMiddleware } from 'lib/validationMiddleware';

const routes = Router();

routes.post('/', transactionQuery, validationMiddleware, transactionController.createTransactionHandler);
routes.post('/withdraw', transactionController.withdrawWithQrCodeHandler);


export default routes;
