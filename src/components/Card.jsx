import React from "react";
import {
  Box,
  Flex,
  Heading,
  // Tag,
  Text,
} from "@chakra-ui/react";
import LazyLoad from "react-lazyload";
import timeSrc from "@/assets/icons/time.svg";
import { Img, Tag } from "@/components";

export default function Card({ source, title, img, description, date }) {
  return (
    <Box
      overflow="hidden"
      borderRadius="12px"
      border="1px solid"
      borderColor="border.100"
      minW="280px"
      mb={{ base: 10, sm: 0 }}
      position="relative"
    >
      <Tag source={source} />
      <LazyLoad h="184px" once>
        <Img
          alt={title}
          cursor="pointer"
          objectFit="cover"
          borderTopRadius="12px"
          width="100%"
          bgColor="border.100"
          h="184px"
          src={img}
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
            key={`card-title-${title}`}
            color="gray.800"
            fontSize="2xl"
          >
            {title}
          </Heading>
          <Text
            key={`card-tagline-${description}`}
            noOfLines={3}
            mt="2"
            mb="2"
            fontSize="md"
            color="gray.700"
            lineHeight="18px"
          >
            {description}
          </Text>
        </Flex>
        <Flex>
          <Img alt={title} width={4} src={timeSrc} />
          <Text ml="2" fontSize="sm">
            {date}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
