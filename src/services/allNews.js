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
  props.setData(result);
  return result;
};
export default getAllNewsByDate;
