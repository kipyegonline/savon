import { Button, Flex, Box, Title } from "@mantine/core";

import SavonLogo from "./logo";

export default function NavBar() {
  return (
    <header className=" ">
      <Flex
        align="center"
        justify={"space-between"}
        pt="sm"
        // direction={{ base: "column", md: "row" }}
      >
        <Box
          className="flex  items-center gap-4 pr-2 "
          style={{ background: "rgba(0,0,0,.5)" }}
        >
          <Box>
            <SavonLogo />
          </Box>

          <Title order={1} c="white">
            Savon
          </Title>
        </Box>
        <Box className=" o">
          <Button className=" rounded-2xl " px="lg">
            Sign in
          </Button>
        </Box>
      </Flex>
    </header>
  );
}
