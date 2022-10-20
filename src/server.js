import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import routPosts from "./routers/posts.routers.js";
import router from "./routers/indexRouter.js";

const server = express();
server.use(json());
server.use(cors());
dotenv.config();

server.use(routPosts);

server.use(router);

server.listen(process.env.PORT, () => {
  console.log("Servidor rodando na porta " + process.env.PORT);
});
