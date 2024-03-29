import { Container, Box } from "@chakra-ui/react";
import { Footer, Navbar } from "@/components";

export default function MainLayout({
  children,
  data,
  setData,
  startDate,
  setStartDate,
  setIsLoading,
  single,
}) {
  return (
    <Box bg="blue.100">
      <Navbar
        data={data}
        setData={setData}
        startDate={startDate}
        setStartDate={setStartDate}
        setIsLoading={setIsLoading}
        single={single}
      />
      <Container
        maxW="container.xl"
        minH={`calc(100vh - ${single ? 337 : 384}px)`}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
}
