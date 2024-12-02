import { createTheme, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports

import { generateColors } from "@mantine/colors-generator";
import Colors from "../config/Colors";
import SavonAppProvider from "./appProvider";
import ErrorBoundary from "./ErrorBoundary";

type Props = {
  children: React.ReactNode;
};
const client = new QueryClient();
const theme = createTheme({
  fontFamily: "'Poppins'",
  primaryColor: "savon",
  colors: { savon: generateColors(Colors.light.primary) },
  headings: { fontFamily: "'Poppins'" },
});

// mother of all providers

export default function AppProviders({ children }: Props) {
  return (
    <SavonAppProvider>
      <QueryClientProvider client={client}>
        <MantineProvider theme={theme}>
          <ErrorBoundary>{children}</ErrorBoundary>
        </MantineProvider>
      </QueryClientProvider>
    </SavonAppProvider>
  );
}
