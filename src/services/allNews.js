import getNewsByDateNewsAm from "./newsAm";
import getNewsByDateArmenPress from "./armenPress";

const getAllNewsByDate = async (props) => {
  const allNews = Promise.all([
    getNewsByDateNewsAm(props),
    getNewsByDateArmenPress(props),
  ]);
  let result = [];
  (await allNews).forEach((news) => (result = [...result, ...news]));
  result.sort((a, b) => new Date(b.date) - new Date(a.date));

  const unifiedResults = [];
  result.map((article) => {
    if (!unifiedResults.find(({ title }) => article.title === title)) {
      unifiedResults.push(article);
    }
  });

  if (props?.setData) {
    props.setData(unifiedResults);
  }
  return unifiedResults;
};
export default getAllNewsByDate;
