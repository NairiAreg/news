import React from "react";
import { Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
import { Card } from "@/components";
import { RotatingTriangles } from "react-loader-spinner";

export default function CardList({ data, isLoading }) {
  return (
    <>
      {isLoading || !data ? (
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
          {data?.map((article) => (
            <GridItem w="100%" key={article.title}>
              <Card {...article} />
            </GridItem>
          ))}
        </SimpleGrid>
      )}
    </>
  );
}
