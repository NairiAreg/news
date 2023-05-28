import { Container } from "@chakra-ui/react";
import { Navbar } from "@/components";

export default function MainLayout({ children, data, setParsedHTML }) {
  return (
    <>
      <Navbar data={data} setParsedHTML={setParsedHTML} />
      <main>
        <Container maxW="container.xl">{children}</Container>
      </main>
    </>
  );
}
