import getNewsByDateNewsAm from "./newsAm";
import getNewsByDateArmenPress from "./armenPress";

const getAllNewsByDate = async (props) => {
    
  return Promise.all([
    getNewsByDateNewsAm(props),
    getNewsByDateArmenPress(props),
  ]);
};
export default getAllNewsByDate;
