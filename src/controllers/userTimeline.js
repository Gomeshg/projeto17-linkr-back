import connection from "../database/postgres.js";
import * as userRepository from '../repositories/userRepository.js'

async function getPostsFilteredByUser(req,res){

    const userId = req.params.id;

    const myUser = res.localItens

    const {rows} = await connection.query(`
         SELECT
            COUNT(likes."linkId") AS "likes",
            links.id,
            links.url,
            links.text,
            links."createDate",
            users."userName",
            users."pictureUrl",
            users.id AS "userId"
        FROM links
            JOIN users
                ON links."userId" = users.id
            LEFT JOIN likes
                ON links.id = likes."linkId"
            WHERE users.id = $1
                GROUP BY
                links.id,
                links.url,
                links.text,
                links."createDate",
                users."userName",
                users."pictureUrl",
                users.id
            ORDER BY "createDate" DESC
            LIMIT 20;`,[userId]);

            console.log(myUser)

            const links = await userRepository.linksUser({ id: myUser.userId });

            const link2 = await userRepository.linksUser({});
            console.log(userId)
            console.log(links)
            console.log(link2)
    console.log( rows)

            link2.map((value) => {
              delete value.createDate;
              return value;
            });
        
            for (let index = 0; index < rows.length; index++) {
              rows[index]["likeUser"] = [];
              for (let i = 0; i < links.length; i++) {
                if (rows[index].id === links[i].linkId) {
                  rows[index]["boolean"] = true;
                }
              }
        
              for (let i = 0; i < link2.length; i++) {
                if (rows[index].id === link2[i].id) {
                  rows[index].likeUser.push(link2[i].userName);
                }
              }

            }
            console.log(links)
            console.log(link2)
    console.log( rows)
    return res.send(rows)

}

async function getUserInfo(req,res){

    const userId = req.params.id;

    const userInfo = await connection.query(`SELECT "userName" FROM users WHERE "id" = $1;`,[userId]);

    return res.send(userInfo.rows)

}

export {getPostsFilteredByUser, getUserInfo}