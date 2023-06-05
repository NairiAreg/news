const axios = require("axios");
const HTMLParser = require("node-html-parser");
const { scrapNewsAm, urlPicker } = require("@/helpers");

export default function handler(req, res) {
  axios
    .get(urlPicker({ ...req.query, type: "newsAm" }))
    .then(({ data }) => HTMLParser.parse(data))
    .then((parsedData) => res.status(200).send(scrapNewsAm(parsedData)));
}
