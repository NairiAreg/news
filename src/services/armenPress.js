const getNewsByDateNewsAm = async ({ year, month, day, language }) =>
  await fetch(
    `api/armenPress?year=${year}&month=${month}&day=${day}&lang=${language}`
  ).then((response) => response.json());

export default getNewsByDateNewsAm;
