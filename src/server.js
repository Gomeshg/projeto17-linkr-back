import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import timelineRouter from './routers/timelineRouter.js';
import routGets from './routers/gets.router.js';
import routPosts from './routers/posts.routers.js';
import routDelete from './routers/delete.routers.js';
import getPostsFilteredByUser from "./routers/userPageGetPosts.js";

const server = express();
server.use(json());
server.use(cors());

server.use(timelineRouter);
server.use(routGets)
server.use(routPosts);
server.use(routDelete);
server.use(getPostsFilteredByUser);

server.listen(process.env.PORT, () => {
  console.log("Servidor rodando na porta " + process.env.PORT);
});
