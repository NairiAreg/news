import { Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getNewsByDateNewsAm, getNewsByDateArmenPress } from "@/services";
import { useDate } from "@/hooks";
import Head from "next/head";
import { useTranslation } from "@/contexts/TranslationContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Navbar, CardList } from "@/components";

export default function NewsAm() {
  const { t, language } = useTranslation();
  const { getStructuredDate } = useDate();
  const [parsedHTML, setParsedHTML] = useState();
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    if (!language) {
      return;
    }
    getNewsByDateArmenPress({
      ...getStructuredDate(startDate),
      language,
    }).then((data) => console.log("🔵 armenpress.am", data));

    getNewsByDateNewsAm({
      ...getStructuredDate(startDate),
      language,
    }).then((data) => setParsedHTML(data));
  }, [language, startDate]);
  return (
    <>
      <Navbar data={parsedHTML} setParsedHTML={setParsedHTML} />
      <Head>
        <title>{t("news")}</title>
      </Head>
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
