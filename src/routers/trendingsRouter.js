import { Router } from "express";

import { insert, list, filter } from "../controllers/trendingsControllers.js";

const trendingsRouter = Router();

trendingsRouter.post("/hashtag", insert);
trendingsRouter.get("/trending", list);

export default trendingsRouter;
