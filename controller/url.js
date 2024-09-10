const shortid = require('shortid');
const URL = require('../model/url');

async function HandleGenerateShortURL(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const shortID = shortid.generate();  // Corrected shortid usage
  await URL.create({
    shortID: shortID,
    redirectURL: body.url,
  });

  return res.json({ id: shortID });
}

module.exports = {
  HandleGenerateShortURL,
};
