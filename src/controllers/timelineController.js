import * as userRepository from "../repositories/userRepository.js";
import connection from "../database/postgres.js";

async function postLinks(req, res) {
  const link = req.body;
  let text = link.text;
  const userId = res.localItens.userId;

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
  console.log("ENTROU NO GET LINKS");
  const user = res.localItens;

  try {
    const { rows } = await connection.query(`
    
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
                GROUP BY
                links.id,
                links.url,
                links.text,
                links."createDate",
                users."userName",
                users."pictureUrl",
                users.id
            ORDER BY "createDate" DESC
            LIMIT 20;`);

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
  };

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
  };

  try {
    await connection.query(`
      UPDATE links
      SET text = $1
      WHERE id = $2
      `, [text, id]
    );
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export { postLinks, getLinks, deleteLink, updateLink };
