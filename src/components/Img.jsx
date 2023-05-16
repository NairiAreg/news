import { Img as ChakraImg } from "@chakra-ui/react";

const Img = ({ src, alt, ...rest }) => (
  <ChakraImg src={src?.src || src} alt={alt} {...rest} />
);

export default Img;
