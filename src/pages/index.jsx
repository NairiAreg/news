import { Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getNewsByDateNewsAm, getNewsByDateArmenPress } from "@/services";
import { useDate } from "@/hooks";
import { useTranslation } from "@/contexts/TranslationContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Navbar, CardList } from "@/components";

import getAllNewsByDate from "@/services/allNews";

export default function Home() {
  const { language } = useTranslation();
  const { getStructuredDate } = useDate();
  const [parsedHTML, setParsedHTML] = useState();
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (!language) {
      return;
    }
    getNewsByDateNewsAm({ ...getStructuredDate(startDate), language }).then(
      (data) => console.log("🔴 news.am", data)
    );
    getNewsByDateArmenPress({ ...getStructuredDate(startDate), language }).then(
      (data) => console.log("🔵 armenpress.am", data)
    );

    getAllNewsByDate({
      ...getStructuredDate(startDate),
      language,
      setData: setParsedHTML,
    })
  }, [language, startDate]);
  return (
    <>
      <Navbar />
      <main>
        <Container maxW="container.xl">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <CardList data={parsedHTML} />
        </Container>
      </main>
    </>
  );
}
