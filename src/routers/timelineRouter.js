import express from 'express';

import { postLinks } from '../controllers/timelineController.js';
import { isItUrl } from '../middlewares/timelineValidation.js';

const timelineRouter = express.Router();

timelineRouter.post(
    '/timeline',
    isItUrl,
    postLinks
);

export default timelineRouter;