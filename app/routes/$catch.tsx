import { Container, Flex, Title, Button, Text } from "@mantine/core";
import { useNavigate } from "@remix-run/react";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Container size="lg">
      <Flex
        p="lg"
        direction="column"
        align="center"
        justify="center"
        gap="md"
        className="!bg-accent !text-white"
      >
        <Title py="md">404</Title>
        <Text py="md">The page was not found</Text>
        <Button onClick={() => navigate("/home")} mt="md">
          Go home
        </Button>
      </Flex>
    </Container>
  );
}
