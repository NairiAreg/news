import React from "react";
import { Text, HStack } from "@chakra-ui/react";

const BlogAuthor = ({name, date}) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      {/* //TODO uncomment when news sources logos are ready */}
      {/* <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      /> */}
      <Text fontWeight="medium">{name}</Text>
      <Text>—</Text>
      <Text>{date.toLocaleDateString()}</Text>
    </HStack>
  );
};

export default BlogAuthor;
