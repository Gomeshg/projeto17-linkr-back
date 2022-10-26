import { hashtagSchema } from "../schemas/schemas.js";
import trendingsRepository from "../repositories/trendingsRepository.js";

async function insert(req, res) {
  // const { hashtag } = req.body;

  try {
    const validation = hashtagSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      return res
        .status(442)
        .send(validation.error.details.map((item) => item.message));
    }

    const thereIsHashtag = await trendingsRepository.verifyHashtag(
      validation.value.hashtag
    );

    if (thereIsHashtag.rows.length === 0) {
      await trendingsRepository.insertHashtag(validation.value.hashtag);
    } else {
      await trendingsRepository.incrementHashtag(thereIsHashtag.rows[0].id);
    }

    return res.sendStatus(200);
  } catch (e) {
    return res.status(500).send(e.messages);
  }
}

async function list(req, res) {
  try {
    const trendings = await trendingsRepository.getTrendings();
    return res.status(200).send(trendings.rows);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function filter(req, res) {
  const validation = hashtagSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    return res
      .status(442)
      .send(validation.error.details.map((item) => item.message));
  }

  try {
    const filterPosts = await trendingsRepository.filterPostsByHashtag(
      validation.value
    );
    return res.status(200).send(filterPosts);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function relationateLinkWithHashtag(req, res) {
  const { linkId, hashtagId } = req.body;

  try {
    await trendingsRepository.relationateLinkWithHashtag(linkId, hashtagId);
    return res.sendStatus(200);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function getLastHashtagId(req, res) {
  try {
    const id = await trendingsRepository.getLastHashtagId();

    return res.status(200).send(id);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

export { insert, list, filter, relationateLinkWithHashtag, getLastHashtagId };
