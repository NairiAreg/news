import { BlogAuthor, MainLayout, Img } from "@/components";
import { useRouter } from "next/router";
import { getSinglePageData } from "@/services";
import { Container, Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "@/contexts/TranslationContext";
import { useEffect, useState } from "react";

export default function Single() {
  const router = useRouter();
  const { id, source } = router.query;
  const [pageData, setPageData] = useState({});

  const { t, language } = useTranslation();
  const { title, img, description, date } = pageData;

  useEffect(() => {
    if (!id || !language) {
      return;
    }
    getSinglePageData({
      id,
      language,
      source,
    }).then((data) => {
      setPageData(data);
    });
  }, [id, language]);

  return (
    <MainLayout single>
      <Container maxW="7xl" p={{ base: 0, sm: 12 }}>
        <Heading as="h1" textAlign="center">
          {title ||
            `${t("noPageTranslation")} ${t(`language@${language}@long`)}`}
        </Heading>

        {!!Object.keys(pageData).length && (
          <>
            <Text as="p" mt={8} fontSize="4xl">
              <Img
                borderRadius="lg"
                w={{ base: "100%", sm: "40%" }}
                src={img}
                alt={title}
                mr={{ base: 0, sm: "36px" }}
                mb={{ base: 0, sm: "10px" }}
                objectFit="contain"
                float="left"
              />
              {description}
            </Text>
            <BlogAuthor name={source} date={new Date(date)} />
          </>
        )}
      </Container>
    </MainLayout>
  );
}
