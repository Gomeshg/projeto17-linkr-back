import { Router } from "express";

import {
  insert,
  list,
  filter,
  increment,
  decrement,
} from "../controllers/trendingsControllers.js";

const trendingsRouter = Router();

trendingsRouter.post("/hashtag", insert);
trendingsRouter.get("/trending", list);
trendingsRouter.put("/hashtag/add/:id", increment);
trendingsRouter.put("/hashtag/sub/:id", decrement);

export default trendingsRouter;
