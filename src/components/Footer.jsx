import {
  ButtonGroup,
  Container,
  DarkMode,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import logo from "@/assets/images/logo.webp";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Img from "./Img";

const Footer = () => (
  <DarkMode>
    <Container
      as="footer"
      role="contentinfo"
      py={{ base: "12", md: "16" }}
      maxW="container.xl"
      color="blue.400"
      bg="orange.400"
      mt={4}
    >
      <Stack spacing={{ base: "4", md: "5" }}>
        <Stack justify="space-between" direction="row" align="center">
          <Img src={logo} h="full" />

          <ButtonGroup variant="ghost">
            <IconButton
              as="a"
              href="#"
              aria-label="LinkedIn"
              icon={<FaLinkedin fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="GitHub"
              icon={<FaGithub fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="Twitter"
              icon={<FaTwitter fontSize="1.25rem" />}
            />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" color="subtle">
          &copy; {new Date().getFullYear()} Nairi. All rights reserved.
        </Text>
      </Stack>
    </Container>
  </DarkMode>
);

export default Footer;
