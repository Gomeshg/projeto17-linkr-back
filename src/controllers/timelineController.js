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
    const links = await connection.query(`
        SELECT *
        FROM links
        ORDER BY "createDate" DESC
        LIMIT 20;
    `)
    try {
        res.status(200).send(links.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export { postLinks, getLinks };