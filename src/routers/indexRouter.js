import { Router } from "express";
import tredingsRouter from "./trendingsRouter.js";

const router = Router();

router.use(tredingsRouter);

export default router;
