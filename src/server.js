import routGets from './routers/gets.router.js' 
import routPosts from './routers/posts.routers.js'
import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

const server = express();
server.use(json());
server.use(cors());
dotenv.config();

server.use(routPosts)

server.use(routGets)

server.listen(process.env.PORT, () => {
  console.log("Servidor rodando na porta " + process.env.PORT);
});
