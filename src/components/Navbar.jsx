import {
  Box,
  Container,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import logo from "@/assets/images/logo.webp";
import Img from "./Img";
import { useTranslation } from "@/contexts/TranslationContext";
import { LANGUAGES } from "@/constants/constants";
import Head from "next/head";
import { useState } from "react";

const LINKS = [
  { title: "News.am", to: "/newsAm" },
  { title: "ArmenPress.am", to: "/armenPressAm" },
];

const NavLink = ({ children, to, ...rest }) => (
  <Link
    px={2}
    py={1}
    rounded="md"
    _hover={{
      textDecoration: "none",
    }}
    href={to}
    {...rest}
  >
    {children}
  </Link>
);

export default function Navbar({ data, setData }) {
  const { t, setLanguage, language } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    const searchComponents = searchValue.split(" ");

    const newData = data.filter((el) =>
      searchComponents.every(
        (tag) =>
          el.title.toLowerCase().includes(tag.toLowerCase()) ||
          el.description.toLowerCase().includes(tag.toLowerCase())
      )
    );

    setData(newData);
  };

  return (
    <>
      <Container maxW="container.xl" as="header" bg="blue.300">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems="center" h="full">
            <Link href="/" h="full">
              <Img src={logo} h="full" />
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {LINKS.map(({ title, to }) => (
                <NavLink to={to} key={title} color="white">
                  {title}
                </NavLink>
              ))}
            </HStack>
          </HStack>

          <Menu>
            <MenuButton as={Button} cursor="pointer" minW={0}>
              {t(`language@${language}@shortFlag`)}
            </MenuButton>
            <MenuList>
              {LANGUAGES.map((lang) => (
                <MenuItem key={lang} onClick={() => setLanguage(lang)}>
                  {t(`language@${lang}@longFlag`)}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>

        {isOpen && (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {LINKS.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        )}
        <Head>
          <title>{t("news")}</title>
        </Head>
      </Container>
      <Container maxW="container.xl" bg="orange.300">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <InputGroup width="20rem">
            <Input
              bgColor="white"
              placeholder="Search"
              size="md"
              variant="outline"
              pr="4.5rem"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button onClick={handleSearch} size="sm" h="1.75rem">
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>

        {isOpen && (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {LINKS.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        )}
        <Head>
          <title>{t("news")}</title>
        </Head>
      </Container>
    </>
  );
}
