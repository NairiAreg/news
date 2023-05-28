import React, { useState } from "react";
import { Flex, GridItem, SimpleGrid } from "@chakra-ui/react";
import { Card, Pagination } from "@/components";
import { RotatingTriangles } from "react-loader-spinner";

export default function CardList({ data, isLoading }) {
  const [itemOffset, setItemOffset] = useState(0);
  const LIMIT = 10; //TODO Change to state when using filters

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
        <>
          <SimpleGrid minChildWidth="320px" spacing="40px">
            {data?.slice(itemOffset, itemOffset + LIMIT)?.map((article) => (
              <GridItem w="100%" key={article.title}>
                <Card {...article} />
              </GridItem>
            ))}
          </SimpleGrid>
          <Pagination
            mt={4}
            dataLength={data.length}
            itemsPerPage={LIMIT}
            setItemOffset={setItemOffset}
          />
        </>
      )}
    </>
  );
}
