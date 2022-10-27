import { hashtagSchema } from "../schemas/schemas.js";
import trendingsRepository from "../repositories/trendingsRepository.js";

async function insert(req, res) {
  // const { hashtag } = req.body;
  console.log("IIIIINNNNNNNNNNSSSSSSSSEEEEEEEEEEERRRRRRRRRRTTTTTTTTTTT");
  try {
    const validation = hashtagSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      return res
        .status(442)
        .send(validation.error.details.map((item) => item.message));
    }

    console.log(validation.value.hashtag);
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
    console.log(`Entrei no catch`);
    console.log(e);
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
  console.log("ENTROU NO RELATIONATE");
  const { linkId, hashtagId } = req.body;
  console.log(req.body);
  try {
    await trendingsRepository.relationateLinkWithHashtag(linkId, hashtagId);
    return res.sendStatus(200);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function getHashtagId(req, res) {
  const { hashtag } = req.params;

  try {
    const data = await trendingsRepository.getHashtagId(hashtag);

    return res.status(200).send(data);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

export { insert, list, filter, relationateLinkWithHashtag, getHashtagId };
