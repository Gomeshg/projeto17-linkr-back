import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import router from "./routers/indexRouter.js";
import timelineRouter from "./routers/timelineRouter.js";
import sigsRout from "./routers/sigs.router.js";
import likesRout from "./routers/likes.routers.js";
// import routeGetUsersHeader from './routers/headerGetFilteredUsers.js';

dotenv.config();

const server = express();
server.use(json());
server.use(cors());

server.use(router);

server.use(sigsRout);

server.use(timelineRouter);

server.use(likesRout);

// server.use(routeGetUsersHeader);

server.listen(process.env.PORT, () => {
  console.log("Servidor rodando na porta " + process.env.PORT);
});
