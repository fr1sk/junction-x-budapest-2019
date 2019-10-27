import { Router } from "express";
import * as userController from "./controller";
import { userValidation } from "./validation";
import { validationMiddleware } from "lib/validationMiddleware";

const routes = Router();

routes.post(
  "/balance",
  userValidation,
  validationMiddleware,
  userController.getBalanceHandler
);

export default routes;
