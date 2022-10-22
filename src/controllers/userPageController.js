import connection from "../database/postgres.js";

async function getPostsFilteredByUser(req,res){

    const userId = req.params.id;

    const postsFilteredByUser = await connection.query(`SELECT * FROM links WHERE "userId" = $1;`,[userId]);

    return res.send(postsFilteredByUser.rows)

}

async function getUserById(req,res){

    const userId = req.params.id;

    const userById = await connection.query(`SELECT * FROM users WHERE "id" = $1;`,[userId]);

    return res.send(userById.rows[0]);

}

export {getPostsFilteredByUser, getUserById}