import authorizationValidation from '../middlewares/authorizationValidation.js';
import  {validDeslike, validLike}   from '../middlewares/likesValidation.js'
import {deletLike, like } from '../controllers/liksController.js'
import express from 'express';


const routDelete = express.Router();

routDelete.post("/dislike",authorizationValidation, validDeslike , deletLike);

routDelete.post("/like",authorizationValidation, validLike , like);


export default routDelete;