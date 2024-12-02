import { Loader, Flex, Text } from "@mantine/core";
import Colors from "config/Colors";

export default function AppLoader({
  message = "Loading",
  type = "oval",
}: {
  message?: string;
  type?: string;
}) {
  return (
    <Flex
      justify="center"
      align={"center"}
      gap="md"
      className="p-8 md:p-16 mx-auto my-4 md:my-8"
    >
      <Loader color={Colors.light.accent} size="xl" type={type} />
      <Text ml="md">{message}</Text>
    </Flex>
  );
}
