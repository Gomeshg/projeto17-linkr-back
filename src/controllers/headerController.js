
import connection from "../database/postgres.js";

async function getUsersFilteredByChars(req,res){

    //const {partOfUsername} = req.body;
    const partOfUsername = req.params.partOfUsername

    const usersFilteredByChars = await connection.query(`SELECT * FROM users WHERE "userName" ILIKE $1;`,[`%${partOfUsername}%`]);

    return res.send(usersFilteredByChars.rows)

}

export {getUsersFilteredByChars}
