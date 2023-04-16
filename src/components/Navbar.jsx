import {
  Box,
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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import logo from "@/assets/images/logo.webp";
import Img from "./Img";
import { useTranslation } from "@/contexts/TranslationContext";
import { LANGUAGES } from "@/constants/constants";

const LINKS = ["Dashboard", "Projects", "Team"];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const { t, setLanguage, language } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="gray.100" px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center" h="full">
          <Img src={logo} h="full" />
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {LINKS.map((link) => (
              <NavLink key={link}>{link}</NavLink>
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
    </Box>
  );
}