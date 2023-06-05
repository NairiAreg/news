import { useEffect, useState } from "react";
import {
  // getNewsByDateNewsAm,
  // getNewsByDateArmenPress,
  getNewsByDateArmenPress,
} from "@/services";
import { useDate, useLocalStorage } from "@/hooks";
import { useTranslation } from "@/contexts/TranslationContext";
import "react-datepicker/dist/react-datepicker.css";
import { CardList, MainLayout } from "@/components";

export default function Home() {
  const { language } = useTranslation();
  const { getStructuredDate } = useDate();
  const [parsedHTML, setParsedHTML] = useState();
  const [searchData, setSearchData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const { put, get } = useLocalStorage();

  useEffect(() => {
    if (parsedHTML) {
      setIsLoading(false);
    }
    setSearchData(parsedHTML);

    if (!parsedHTML || !startDate) {
      return;
    }
    const cacheDate = new Date(startDate).toLocaleDateString();
    if (!get(cacheDate) && parsedHTML) {
      put(cacheDate, JSON.stringify(parsedHTML?.slice(10))); //TODO change 10 to LIMIT
    }
  }, [parsedHTML, startDate]);

  console.log("🟢", searchData);

  useEffect(() => {
    if (!language) {
      return;
    }

    getNewsByDateArmenPress({
      ...getStructuredDate(startDate),
      language,
    }).then((data) => {
      setParsedHTML(data);
      setIsLoading(false);
    });

    // getAllNewsByDate({
    //   ...getStructuredDate(startDate),
    //   language,
    // }).then((data) => {
    //   setParsedHTML(data);
    //   setIsLoading(false);
    // });
  }, [language, startDate]);

  console.log("😅", parsedHTML);

  return (
    <MainLayout
      data={parsedHTML}
      setData={setSearchData}
      startDate={startDate}
      setStartDate={setStartDate}
      setIsLoading={setIsLoading}
    >
      <CardList data={searchData} isLoading={isLoading} date={startDate} />
    </MainLayout>
  );
}
