import { Box, Button, Flex } from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import { useAppContext } from "Providers/appProvider";

export default function CTA() {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const handleClick = () => {
    if (user) navigate("/home#albums");
    else navigate("/signup");
  };
  const handleOutline = () => {
    if (user) navigate("/home#users");
    else navigate("/login");
  };
  return (
    <Box className="px-10 py-10">
      <Flex justify={"center"} align="center" gap="md">
        <Box className="w-full md:w-1/2 flex gap-8 items-center flex-col">
          <Button bg="accent" fullWidth onClick={handleClick}>
            {user ? "View my albums" : " Get Started"}
          </Button>
          <Button bg="accent" fullWidth onClick={handleOutline}>
            {user ? "See what friends are sharing" : " Login"}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
