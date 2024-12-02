import { Title, Button, Flex, Container } from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import React, { Component } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    if (error instanceof Error) return { hasError: true };
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    // You can also log the error to an error reporting service
    //sentry will pick from here
    if (error instanceof Error) {
      console.log(error.message);
    }
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <SavonErrorComponent />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
const SavonErrorComponent = () => {
  const navigate = useNavigate();
  return (
    <Container size="lg">
      <Flex p="lg" direction="column" align="center" justify="center" gap="md">
        <Title py="lg">Something went wrong.., dont fret</Title>
        <Button onClick={() => navigate("/home")} mt="md">
          Go home
        </Button>
      </Flex>
    </Container>
  );
};
