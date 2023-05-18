import { Container } from "@chakra-ui/react";
import { Navbar } from "@/components";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        <Container maxW="container.xl">{children}</Container>
      </main>
    </>
  );
}
