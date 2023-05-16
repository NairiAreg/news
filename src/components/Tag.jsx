import React from "react";
import { Tag } from "@chakra-ui/react";

export default function TagComponent({ source }) {
  return (
    <Tag
      variant={source}
      position="absolute"
      borderLeftRadius={0}
      top={5}
      fontSize="lg"
    >
      {source}
    </Tag>
  );
}
