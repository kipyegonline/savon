import { Button, Flex, Box, Title } from "@mantine/core";

import SavonLogo from "./logo";
import { useNavigate } from "@remix-run/react";

export default function NavBar({ isHome = false }: { isHome: boolean }) {
  const navigate = useNavigate();
  const handlelogin = () => {
    navigate("/signup");
  };
  return (
    <header className=" ">
      <Flex
        align="center"
        justify={"space-between"}
        pt="sm"
        // direction={{ base: "column", md: "row" }}
      >
        <Box
          className="flex  items-center gap-4 pr-2  "
          style={{ background: isHome ? "rgba(0,0,0,.5)" : "none" }}
        >
          <Box>
            <SavonLogo />
          </Box>

          <Title order={1} c={isHome ? "white" : "#bbb"}>
            Savon
          </Title>
        </Box>
        {isHome ? (
          <Box className=" o">
            <Button className=" rounded-2xl " px="lg" onClick={handlelogin}>
              Sign in
            </Button>
          </Box>
        ) : null}
      </Flex>
    </header>
  );
}
