import authorizationValidation from '../middlewares/authorizationValidation.js';
import  deletsValidation   from '../middlewares/deletsValidation.js'
import deletLike from '../controllers/delets.js'
import express from 'express';


const routDelete = express.Router();

console.log("oi")

routDelete.post("/dislike",authorizationValidation, deletsValidation , deletLike);

export default routDelete;