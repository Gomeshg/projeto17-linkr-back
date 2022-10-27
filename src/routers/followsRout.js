import express from 'express';
import {followUnfollow, follows} from '../controllers/followsController.js';
import authorizationValidation from '../middlewares/authorizationValidation.js';

const followRouter = express.Router();

followRouter.post("/follow/:id", authorizationValidation, followUnfollow)

followRouter.get("/follow/:id", authorizationValidation, follows)

export default followRouter;

