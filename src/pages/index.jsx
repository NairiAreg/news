import { Container, Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getNewsByDateNewsAm, getNewsByDateArmenPress } from "@/services";
import { useDate } from "@/hooks";
import Head from "next/head";
import { RotatingTriangles } from "react-loader-spinner";
import { useTranslation } from "@/contexts/TranslationContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Navbar, Card } from "@/components";
// import Card from "@/components/Card";

import getAllNewsByDate from "@/services/allNews";

export default function Home() {
  const { t, language } = useTranslation();
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

    getAllNewsByDate({ ...getStructuredDate(startDate), language }).then(
      (data) => setParsedHTML(data)
    );
  }, [language, startDate]);
  return (
    <>
      <Navbar />
      <Head>
        <title>{t("news")}</title>
      </Head>
      <main>
        <Container maxW="container.xl">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          {!parsedHTML ? (
            <Flex justifyContent="center" w="full" mt={40}>
              <RotatingTriangles
                visible={true}
                height="80"
                width="80"
                colors={["red", "blue", "orange"]}
                ariaLabel="rotating-triangels-loading"
                wrapperStyle={{}}
                wrapperClass="rotating-triangels-wrapper"
              />
            </Flex>
          ) : (
            <SimpleGrid minChildWidth="320px" spacing="40px">
              {parsedHTML?.map((article) => (
                <GridItem w="100%" key={article.title}>
                  <Card {...article} />
                </GridItem>
              ))}
            </SimpleGrid>
          )}
        </Container>
      </main>
    </>
  );
}
