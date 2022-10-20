import connection from "../database/postgres.js";

export async function insert({localItens , iten}){
    const lock=[];

    for (let index = 0; index < iten.length; index++) {
        lock.push(`$${index+1}`)
    }
    try {
        
        const {rows} = await connection.query(`INSERT INTO ${localItens} VALUES (${lock.toString()}) RETURNING id ;`, iten )

        return rows
        
    } catch (error) {
        return error;
    
      }
}

export async function getItem({table , categori, iten}){
  try {
            const {rows} = await connection.query(`SELECT * FROM ${table} WHERE ${categori}=${iten} ;`)
            
            return rows;
        
    } catch (error) {
      return error;
    }
}

export async function getList({localItens ,value}){

  try {
    
    const {rows} = await connection.query(`SELECT * FROM $1 = $2 ;`, [localItens, value])

    return rows;
    
  } catch (error) {
  
    return error;    
  
  }
}

export async function updateIten({table ,colun ,value, id}){

    try {
      
      const {rows} = await connection.query(`UPDATE ${table} SET "${colun}" = ${value} WHERE id = ${id};`)
  
      return rows;
      
    } catch (error) {
      return error;    
    }
  }
  
export async function deleteIten({table,local ,id}){

    try {
      
      const {rows} = await connection.query(`DELETE FROM ${table} WHERE $1 = $2;`, [local, id])
  
      return rows;
      
    } catch (error) {
      return error;    
    }
  }

export async function verifiIten({user, shortId}){

    try {
      
      const promis = await connection.query(
        `SELECT "usersShortens".*
            FROM "usersShortens" 
            WHERE  "usersShortens"."usersId" = $1 AND "usersShortens"."shortensId" = $2;`,[user,shortId])
  
      return promis;
      
    } catch (error) {
      return error;    
    }
  }

export async function somaUsers(user){

try {
    
    const promis = await connection.query(
    `SELECT 
    "usersShortens".id AS "idUsersShortens",
    "usersShortens"."shortensId" AS "idDoUsersShortens",
    "usersShortens"."usersId" AS "idDoUsersShortens",
    shortens.url,
    shortens.id AS "IDshortens",    
    shortens."shortUrl" AS "UrlShortens",
    shortens."visitCount",
    users.name
    FROM "usersShortens" 
            JOIN shortens
                ON "usersShortens"."shortensId" = shortens.id
            JOIN users
                ON "usersShortens"."usersId" = users.id
            WHERE "usersShortens"."usersId" = $1

                ;`,[user])
                return promis;
    
} catch (error) {
    return error;    
}
}

export async function rank(){

try {
    
    const promis = await connection.query(
    `SELECT 
    users.id,
    users.name,
    COUNT(shortens) AS "linksCount",
    SUM(shortens."visitCount") AS "visitCount"
    FROM "usersShortens" 
        JOIN users
                ON "usersShortens"."usersId" = users.id
        JOIN shortens
                ON "usersShortens"."shortensId" = shortens.id
        GROUP BY users.id 
        ORDER BY "visitCount" DESC LIMIT 10
        ;`)

    return promis;
    
} catch (error) {
    return error;    
}
}

export async function timeDel(){
  try {

      const list = await getList('sessions' , "")
      
      list.map(async(value)=>{

        if( Number(Date.now() - value.createdAt.getTime()) > 360000 ){
        await deleteIten('sessions', "id", value.id)} 
      })

      
  } catch (error) {
      console.log(error)
  }


}

