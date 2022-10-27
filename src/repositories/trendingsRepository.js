import connection from "../database/postgres.js";

async function getTrendings() {
  return connection.query(
    "SELECT id, tag FROM trendings ORDER BY count DESC LIMIT 10;"
  );
}

async function filterPostsByHashtag(hashtag) {
  return connection.query(
    `
    SELECT 
      tl.id, 
      t.id AS "trendingId", 
      t.tag, 
      t.count, 
      l.id AS "linkId", 
      l.url,
      l.text,
      l.text, 
      l."userId", 
      u."userName" 
    FROM 
      "trendingLinks" tl 
    JOIN 
      links l 
    ON 
      tl."linkId"=l.id 
    JOIN 
      trendings t 
    ON 
      tl."trendingId"=t.id 
    JOIN 
      users u 
    ON 
      l."userId"=u.id 
    JOIN
      likes lk
    ON  
      l.id=lk."linkId"
    WHERE 
      t.tag=$1 
    ORDER BY 
      tl.id 
    DESC;`,
    [hashtag]
  );
}

async function insertHashtag(hashtag) {
  return connection.query("INSERT INTO trendings(tag) VALUES($1);", [hashtag]);
}

async function incrementHashtag(id) {
  return connection.query("UPDATE trendings SET count=count+1 WHERE id=$1;", [
    id,
  ]);
}

async function decrementHashtag(id) {
  return connection.query("UPDATE trendings SET count=count-1 WHERE id=$1;", [
    id,
  ]);
}

async function verifyHashtag(hashtag) {
  return connection.query("SELECT id FROM trendings WHERE tag=$1;", [hashtag]);
}

async function relationateLinkWithHashtag(linkId, trendingId) {
  return connection.query(
    `INSERT INTO "trendingLinks"("linkId", "trendingId") VALUES($1, $2);`,
    [linkId, trendingId]
  );
}

async function getLastHashtagId() {
  return connection.query(
    `SELECT id FROM trendings ORDER BY "createDate" DESC LIMIT 1;`
  );
}

const trendingsRepository = {
  getTrendings,
  filterPostsByHashtag,
  insertHashtag,
  incrementHashtag,
  decrementHashtag,
  verifyHashtag,
  relationateLinkWithHashtag,
  getLastHashtagId,
};

export default trendingsRepository;
