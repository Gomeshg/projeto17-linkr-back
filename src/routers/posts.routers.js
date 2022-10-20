import {signUpValidation, signInValidation} from '../middlewares/sigsValidation.js'
import {signUp , signIn } from '../controllers/sigs.js'
import express from 'express'

const routPosts = express.Router();


routPosts.post("/signup", signUpValidation, signUp);

routPosts.post("/signin", signInValidation, signIn);


export default routPosts;