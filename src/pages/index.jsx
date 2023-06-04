import { useEffect, useState } from "react";
import {
  // getNewsByDateNewsAm,
  // getNewsByDateArmenPress,
  getAllNewsByDate,
} from "@/services";
import { useDate } from "@/hooks";
import { useTranslation } from "@/contexts/TranslationContext";
import "react-datepicker/dist/react-datepicker.css";
import { CardList, MainLayout } from "@/components";

export default function Home() {
  const { language } = useTranslation();
  const { getStructuredDate } = useDate();
  const [parsedHTML, setParsedHTML] = useState();
  const [searchData, setSearchData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (parsedHTML) {
      setIsLoading(false);
    }
    setSearchData(parsedHTML);
  }, [parsedHTML]);

  const [startDate, setStartDate] = useState(new Date());

  console.log("🟢", searchData);

  useEffect(() => {
    if (!language) {
      return;
    }
    // getNewsByDateNewsAm({
    //   ...getStructuredDate(startDate),
    //   language,
    // });
    // // .then((data) => console.log("🔴 news.am", data));
    // getNewsByDateArmenPress({
    //   ...getStructuredDate(startDate),
    //   language,
    // });
    // // .then((data) => console.log("🔵 armenpress.am", data));

    getAllNewsByDate({
      ...getStructuredDate(startDate),
      language,
    }).then((data) => {
      setParsedHTML(data);
      setIsLoading(false);
    });
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
      <CardList data={searchData} isLoading={isLoading} />
    </MainLayout>
  );
}
