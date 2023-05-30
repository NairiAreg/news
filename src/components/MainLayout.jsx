import { Container, Box } from "@chakra-ui/react";
import { Footer, Navbar } from "@/components";

export default function MainLayout({ children, data, setParsedHTML }) {
  return (
    <Box bg="blue.100">
      <Navbar />
      <main>
        <Container maxW="container.xl">{children}</Container>
      </main>
      <Footer />
    </Box>
  );
}
