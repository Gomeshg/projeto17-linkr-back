import authorizationValidation from '../middlewares/authorizationValidation.js';
import  {validShares}  from '../middlewares/sharesValidation.js'
import shares from '../controllers/sharesController.js'
import express from 'express';


const shareRout = express.Router();

shareRout.post("/shares", authorizationValidation ,validShares, shares );


export default shareRout;