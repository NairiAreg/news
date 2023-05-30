import { Container, Box } from "@chakra-ui/react";
import { Footer, Navbar } from "@/components";

export default function MainLayout({ children, data, setData }) {
  return (
    <Box bg="blue.100">
      <Navbar data={data} setData={setData} />
      <Container maxW="container.xl" minH="calc(100vh - 384px)">
        {children}
      </Container>
      <Footer />
    </Box>
  );
}
