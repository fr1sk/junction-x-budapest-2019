import {Router} from 'express';
import * as transactionController from './controller';
import {transactionQuery} from './validation';

const routes = Router();

routes.post('/reserve', transactionQuery, transactionController.createReservationHandler);
routes.post('/withdraw', transactionController.withdrawWithQrCodeHandler);


export default routes;
