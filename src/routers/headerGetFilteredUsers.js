
import express from 'express';
import { getUsersFilteredByChars } from '../controllers/headerController.js';

const router = express.Router();

router.get("/users/search/:partOfUsername",getUsersFilteredByChars)

export default router;

