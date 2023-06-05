const axios = require("axios");
const HTMLParser = require("node-html-parser");
const {
  scrapSingleNewsAm,
  scrapSingleArmenPressAm,
  urlPicker,
} = require("@/helpers");

const scrapers = {
  "news.am": scrapSingleNewsAm,
  "armenpress.am": scrapSingleArmenPressAm,
};

export default function handler(req, res) {
  const { source } = req.query;

  axios
    .get(urlPicker({ ...req.query, type: source + "Single" }))
    .then(({ data }) => HTMLParser.parse(data))
    .then((parsedData) => res.status(200).send(scrapers[source](parsedData)));
}
