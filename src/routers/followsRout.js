import express from 'express';
import followController from '../controllers/followsController.js';
import authorizationValidation from '../middlewares/authorizationValidation.js';

const followRouter = express.Router();

followRouter.post("/follow/:id", authorizationValidation, followController)

export default followRouter;

