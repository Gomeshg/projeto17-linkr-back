import express from "express";

import {
  deleteLink,
  getLinks,
  postLinks,
} from "../controllers/timelineController.js";
import authorizationValidation from "../middlewares/authorizationValidation.js";
import { isItUrl } from "../middlewares/timelineValidation.js";

const timelineRouter = express.Router();

timelineRouter.post("/timeline", authorizationValidation, isItUrl, postLinks);

timelineRouter.get("/timeline", authorizationValidation, getLinks);

timelineRouter.delete("/deleteTimeline/:id", deleteLink);

export default timelineRouter;
