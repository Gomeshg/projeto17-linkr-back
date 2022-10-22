import express from 'express';
import { getPostsFilteredByUser } from '../controllers/userPageController.js';

const router = express.Router();

router.get("/posts/user/:id",getPostsFilteredByUser)

export default router;