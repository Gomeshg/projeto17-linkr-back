
import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import timelineRouter from './routers/timelineRouter.js';
import routGets from './routers/gets.router.js' 
import routPosts from './routers/posts.routers.js'

dotenv.config();

const server = express();
server.use(json());
server.use(cors());

server.use(routPosts)

server.use(routGets)

server.use(timelineRouter);

server.listen(process.env.PORT, () => {
  console.log("Servidor rodando na porta " + process.env.PORT);
});