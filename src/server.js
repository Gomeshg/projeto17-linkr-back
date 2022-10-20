import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import routPosts from './routers/posts.routers.js';
import getPostsFilteredByUser from "./routers/userPageGetPosts.js"

const server = express();
server.use(json());
server.use(cors());

server.use(routPosts);
server.use(getPostsFilteredByUser)

server.listen(process.env.PORT, () => {
  console.log("Servidor rodando na porta " + process.env.PORT);
});