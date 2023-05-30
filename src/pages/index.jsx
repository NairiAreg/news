import { useEffect, useState } from "react";
import { getNewsByDateNewsAm, getNewsByDateArmenPress } from "@/services";
import { useDate } from "@/hooks";
import { useTranslation } from "@/contexts/TranslationContext";
import "react-datepicker/dist/react-datepicker.css";
import { CardList, DatePicker, Img, MainLayout } from "@/components";
import calendar from "@/assets/icons/calendar.svg";
import getAllNewsByDate from "@/services/allNews";
import { Box, InputGroup, InputLeftElement } from "@chakra-ui/react";

export default function Home() {
  const { language } = useTranslation();
  const { getStructuredDate } = useDate();
  const [parsedHTML, setParsedHTML] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (parsedHTML) {
      setIsLoading(false);
    }
  }, [parsedHTML]);

  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (!language) {
      return;
    }
    getNewsByDateNewsAm({ ...getStructuredDate(startDate), language })
      .then
      // (data) => console.log("🔴 news.am", data)
      ();
    getNewsByDateArmenPress({ ...getStructuredDate(startDate), language })
      .then
      // (data) => console.log("🔵 armenpress.am", data)
      ();

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
    <MainLayout data={parsedHTML} setParsedHTML={setParsedHTML}>
      <Box position="relative" zIndex={1}>
        <InputGroup>
          <InputLeftElement
            zIndex={4}
            py="2"
            px="10px"
            pointerEvents="none"
            color="gray.700"
          >
            <Img src={calendar} />
          </InputLeftElement>
          <DatePicker
            date={startDate}
            onChange={(date) => {
              setStartDate(date);
              setIsLoading(true);
            }}
            maxDate={new Date()}
          />
        </InputGroup>
      </Box>
      <CardList data={parsedHTML} isLoading={isLoading} />
    </MainLayout>
  );
}
