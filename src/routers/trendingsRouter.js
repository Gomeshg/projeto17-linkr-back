import { Router } from "express";

import {
  insert,
  list,
  filter,
  relationateLinkWithHashtag,
  getLastHashtagId,
} from "../controllers/trendingsControllers.js";
import authorizationValidation from "../middlewares/authorizationValidation.js";

const trendingsRouter = Router();

trendingsRouter.post("/hashtag", authorizationValidation, insert);
trendingsRouter.get("/trending", authorizationValidation, list);

trendingsRouter.get("/hashtag/:hashtag", authorizationValidation, filter);

trendingsRouter.get("/lastHashtag", authorizationValidation, getLastHashtagId);
trendingsRouter.post(
  "/relationateLinkWithHashtag",
  authorizationValidation,
  relationateLinkWithHashtag
);

export default trendingsRouter;
