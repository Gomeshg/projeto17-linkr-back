import { hashtagSchema } from "../schemas/schemas.js";

async function insert(req, res) {
  const { hashtag } = req.params;

  try {
    const validation = hashtagSchema.validate(req.body, { abortEarly: false });
    if (validation.error) {
      return res
        .status(442)
        .send(validation.error.details.map((item) => item.message));
    }

    return res.status(200).send(validation.value);
  } catch (e) {
    return res.status(500).send(e.messages);
  }
}

async function remove(req, res) {
  try {
  } catch (e) {
    return res.status(500).send(e.messages);
  }
}

async function increment(req, res) {
  try {
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

export { insert, remove, increment };
