import { Router } from 'express';
import * as atmController from './controller';
import { atmQuery } from './validation';

const routes = Router();

/**
 *  @swagger
 *  tags:
 *    name: ATMSs
 *    description: ATM management
 */

/**
 *  @swagger
 *  path:
 *    /api/atm/:
 *      get:
 *        summary: Get atm list
 *        tags: [Atms]
 *        responses:
 *          "200":
 *            description: A atm schema
 *            content:
 *              application/json
 */

routes.get('/', atmQuery, atmController.getAtmListHandler);

routes.post('/recommend', atmController.getRecommendedAtmsHandler);

export default routes;
