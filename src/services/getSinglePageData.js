const getSinglePageData = async ({ id, language, source }) =>
  await fetch(
    `api/singleScrap?lang=${language}&id=${id}&source=${source}`
  ).then((response) => response.json());

export default getSinglePageData;
