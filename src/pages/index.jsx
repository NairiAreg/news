import {
  Button,
  Container,
  Flex,
  GridItem,
  Heading,
  Link,
  Box,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import LazyLoad from "react-lazyload";
import timeSrc from "@/assets/icons/time.svg";
import { useEffect, useState } from "react";
import { getNewsByDate } from "@/services";
import { useDate } from "@/hooks";
import Head from "next/head";
import { RotatingTriangles } from "react-loader-spinner";
import { useTranslation } from "@/contexts/TranslationContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Navbar, Img } from "@/components";

export default function Home() {
  const [startDate, setStartDate] = useState(new Date());

  const { t, setLanguage, language } = useTranslation();
  const { getStructuredDate } = useDate();
  const [parsedHTML, setParsedHTML] = useState();
  useEffect(() => {
    getNewsByDate({ ...getStructuredDate(startDate), language }).then((data) =>
      setParsedHTML(data)
    );
  }, [language, startDate]);
  return (
    <>
      <Navbar />
      <Head>
        <title>News</title>
      </Head>
      <main>
        <Container maxW="container.xl">
          <Button
            colorScheme="blue"
            onClick={() => {
              setLanguage("hy");
            }}
          >
            Arm
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              setLanguage("en");
            }}
          >
            Eng
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              setLanguage("ru");
            }}
          >
            Rus
          </Button>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />

          <Heading>{t("Hello")}</Heading>
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
                  <Box
                    overflow="hidden"
                    borderRadius="12px"
                    border="1px solid"
                    borderColor="border.100"
                    minW="280px"
                    mb={{ base: 10, sm: 0 }}
                  >
                    <LazyLoad h="184px" once>
                      <Img
                        alt={article.title}
                        cursor="pointer"
                        objectFit="cover"
                        borderTopRadius="12px"
                        width="100%"
                        bgColor="border.100"
                        h="184px"
                        src={article.img}
                      />
                    </LazyLoad>
                    <Flex
                      h="200px"
                      px={5}
                      pb={5}
                      pt={4}
                      flexDirection="column"
                      justifyContent="space-between"
                      bg="white"
                    >
                      <Flex direction="column">
                        <Heading
                          as="h2"
                          noOfLines={2}
                          key={`card-title-${article.title}`}
                          color="gray.800"
                          fontSize="2xl"
                        >
                          {article.title}
                        </Heading>
                        <Text
                          key={`card-tagline-${article.description}`}
                          noOfLines={3}
                          mt="2"
                          mb="2"
                          fontSize="md"
                          color="gray.700"
                          lineHeight="18px"
                        >
                          {article.description}
                        </Text>
                      </Flex>
                      <Flex>
                        <Img alt={article.title} width={4} src={timeSrc} />
                        <Text ml="2" fontSize="sm">
                          {article.date}
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                </GridItem>
              ))}
            </SimpleGrid>
          )}
        </Container>
      </main>
    </>
  );
}
