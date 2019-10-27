import { Router } from 'express';
import { validationMiddleware } from 'lib/validationMiddleware';
import * as atmController from './controller';
import { atmQuery, recommendedAtmQuery } from './validation';

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

routes.get('/', atmQuery, validationMiddleware, atmController.getAtmListHandler);

routes.post('/recommend', recommendedAtmQuery, validationMiddleware, atmController.getRecommendedAtmsHandler);

export default routes;
