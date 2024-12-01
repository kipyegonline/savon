import {
  SimpleGrid,
  Box,
  Flex,
  Center,
  List,
  ListItem,
  Text,
} from "@mantine/core";
import SavonLogo from "./logo";
import {
  LinkedinIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
} from "lucide-react";

export default function Footer() {
  const styles =
    "hover:text-secondary transform scale-1.2 transition-all duration-300 ease";
  return (
    <Box p="md" className="bg-secondary">
      <SimpleGrid cols={{ base: 1, md: 3 }} p="lg">
        <Box className="flex flex-row  border-red-500 items-center">
          <Box>
            <SavonLogo />
          </Box>

          <Box p="md" ml="md">
            <ul className="flex gap-8 items-center   w-full">
              <li>
                <LinkedinIcon size={24} className={styles} />
              </li>
              <li>
                {" "}
                <TwitterIcon size={24} className={styles} />
              </li>
              <li>
                {" "}
                <FacebookIcon size={24} className={styles} />
              </li>

              <li>
                {" "}
                <InstagramIcon size={24} className={styles} />
              </li>
            </ul>
          </Box>
        </Box>
        <Center>
          <List p="md" className="flex flex-col gap-2 text-lg cursor-pointer">
            <ListItem>About</ListItem>
            <ListItem>Community</ListItem>
            <ListItem>Contact us</ListItem>
          </List>
        </Center>
        <Center>
          <List p="md" className="flex flex-col gap-2 text-lg cursor-pointer">
            <ListItem>FAQ</ListItem>
            <ListItem>Terms & Conditions</ListItem>
            <ListItem>Privacy Policy</ListItem>
          </List>
        </Center>
      </SimpleGrid>
      <Flex justify="center" align="center" className="bg-primary py-2">
        <Text> &copy; {new Date().getFullYear()} All Rights reserved </Text>
      </Flex>
    </Box>
  );
}
