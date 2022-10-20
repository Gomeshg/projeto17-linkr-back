import express from 'express';
import { getPostsFilteredByUser } from '../controllers/userPage.js';

const router = express.Router();

router.get("/users/:id",getPostsFilteredByUser)

export default router;