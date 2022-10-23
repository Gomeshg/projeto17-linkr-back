import * as userRepository from '../repositories/userRepository.js' 
import connection from "../database/postgres.js";

async function postLinks(req, res) {
    const link = req.body;
    let text = link.text;
    const userId = 1;

    if (link.text === "" || link.text === undefined) {
        link.text = null;
    };

    await connection.query(`
        INSERT INTO links ("userId", url, text)
        VALUES ($1, $2, $3);
        `, [userId, link.url, link.text]
    );

    try {
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

async function getLinks(req, res) {


    const user = res.localItens;

    try {

        const {rows} = await connection.query(`
    
        SELECT
            COUNT(likes."linkId") AS likes,
            links.id,
            links.url,
            links.text,
            links."createDate",
            users."userName",
            users."pictureUrl"
        FROM links
        JOIN users
            ON links."userId" = users.id
        LEFT JOIN likes
            ON links.id = likes."userId"
            GROUP BY
            links.id,
            links.url,
            links.text,
            links."createDate",
            users."userName",
            users."pictureUrl"
        ORDER BY "createDate" DESC
        LIMIT 20;`
        )
        const links = await userRepository.linksUser({id:user.userId});
        
        rows.map((value)=>{
            links.map((link)=> { 
            
                if(link.linkId === value.id)return value["boolean"]= true
                value["boolean"]= false;
            } ) 
        })    

        res.status(200).send(rows);
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
    }
};




export { postLinks, getLinks };