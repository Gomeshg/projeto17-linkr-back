import authorizationValidation from '../middlewares/authorizationValidation.js';
import { signValid } from '../controllers/sigs.js' 
import express from 'express';

const routGets = express.Router();

routGets.get("/signvalid", authorizationValidation, signValid);

export default routGets;
