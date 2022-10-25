import connection from "../database/postgres.js";

async function getPostsFilteredByUser(req,res){

    const userId = req.params.id;

    const postsFilteredByUser = await connection.query(`SELECT * FROM links WHERE "userId" = $1;`,[userId]);

    return res.send(postsFilteredByUser.rows)

}

async function getUserInfo(req,res){

    const userId = req.params.id;

    const userInfo = await connection.query(`SELECT "userName" FROM users WHERE "id" = $1;`,[userId]);

    return res.send(userInfo.rows)

}

export {getPostsFilteredByUser, getUserInfo}