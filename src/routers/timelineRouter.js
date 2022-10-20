import express from 'express';

import { getLinks, postLinks } from '../controllers/timelineController.js';
import { isItUrl } from '../middlewares/timelineValidation.js';

const timelineRouter = express.Router();

timelineRouter.post(
    '/timeline',
    isItUrl,
    postLinks
);

timelineRouter.get(
    '/timeline',
    getLinks
);

export default timelineRouter;