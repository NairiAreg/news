import { Img as ChakraImg } from "@chakra-ui/react";

const Img = ({ src, alt, ...rest }) => (
  <ChakraImg src={src?.src || src} {...rest} />
);

export default Img;
