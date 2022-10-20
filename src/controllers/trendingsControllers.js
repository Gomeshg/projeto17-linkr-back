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

    await trendingsRepository.insertHashtag(validation.value);
    return res.sendStatus(201);
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

async function increment(req, res) {
  const { id } = req.params;

  try {
    const thereIsId = await trendingsRepository.verifyId(id);
    if (thereIsId.rows.length === 0) {
      return res.sendStatus(404);
    }

    await trendingsRepository.incrementHashtag(id);
    return res.sendStatus(200);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function decrement(req, res) {
  const { id } = req.params;

  try {
    const thereIsId = await trendingsRepository.verifyId(id);
    if (thereIsId.rows.length === 0) {
      return res.sendStatus(404);
    }

    await trendingsRepository.decrementHashtag(id);
    return res.sendStatus(200);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

export { insert, list, filter, increment, decrement };
