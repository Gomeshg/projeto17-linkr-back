import * as userRepository from "../repositories/userRepository.js";
import connection from "../database/postgres.js";

async function postLinks(req, res) {
  const link = req.body;
  let text = link.text;
  const userId = res.localItens.userId;

  console.log(userId,"  ioioioioio11111  ", link.url,"  ioioioioio  " ,link.text)

  if (link.text === "" || link.text === undefined) {
    link.text = null;
  }
  try {
    
    await connection.query(
      `
        INSERT INTO links ("userId", url, text)
        VALUES ($1, $2, $3);
        `,
      [userId, link.url, link.text]
    );

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getLinks(req, res) {
  const user = res.localItens;

  try {
    const { rows } = await connection.query(`
    SELECT
      COUNT(likes."linkId") AS "likes",
      links.repost,
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
      LEFT JOIN followers
          ON followers.following = users.id 
      WHERE followers."userId" = $1 OR users.id=$2
        GROUP BY
        links.repost,
        links.id,
        links.url,
        links.text,
        links."createDate",
        users."userName",
        users."pictureUrl",
        users.id
    ORDER BY "createDate" DESC
    LIMIT 20;`,[user.userId, user.userId]);

    if(rows.length===0)return res.status(200).send(rows)

    const links = await userRepository.linksUser({ id: user.userId });

    const link2 = await userRepository.linksUser({});

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

    res.status(200).send(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function deleteLink(req, res) {
  const id = req.params.id;
  const { auth } = req.headers;
  const token = auth?.replace("Bearer ", "");

  const rows = await userRepository.getItem({
    table: "sessions",
    categori: "token",
    iten: `'${token}'`,
  });

  if (!rows) {
    return res.status(401).send("Sessão não encontrada, favor relogar.");
  }

  try {
    await connection.query(
      `
            DELETE FROM links
            WHERE id = $1
            `,
      [id]
    );
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getLastLinkId(req, res) {
  try {
    const id = await connection.query(
      `SELECT id FROM links ORDER BY "createDate" DESC LIMIT 1;`
    );

    return res.status(200).send(id);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function updateLink(req, res) {
  const id = req.params.id;
  const text = req.body.text;

  const { auth } = req.headers;
  const token = auth?.replace("Bearer ", "");

  const rows = await userRepository.getItem({
    table: "sessions",
    categori: "token",
    iten: `'${token}'`,
  });

  if (!rows) {
    return res.status(401).send("Sessão não encontrada, favor relogar.");
  }

  try {
    await connection.query(
      `
      UPDATE links
      SET text = $1
      WHERE id = $2
      `,
      [text, id]
    );
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export { postLinks, getLinks, deleteLink, updateLink, getLastLinkId };


// SELECT
// COUNT(likes."linkId") AS "likes",
// links.id,
// links.url,
// links.text,
// links."createDate",
// users."userName",
// users."pictureUrl",
// users.id AS "userId"
// FROM links
// JOIN users
//     ON links."userId" = users.id
// LEFT JOIN likes
//     ON links.id = likes."linkId"
//     GROUP BY
//     links.id,
//     links.url,
//     links.text,
//     links."createDate",
//     users."userName",
//     users."pictureUrl",
//     users.id
// ORDER BY "createDate" DESC
// LIMIT 20;