import { Router } from "express";

// importar controllers
import { insert, remove } from "../controllers/trendingsControllers.js";

const tredingsRouter = Router();

tredingsRouter.post("/hashtag", insert);

export default tredingsRouter;
