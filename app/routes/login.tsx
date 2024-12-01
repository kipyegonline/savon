import {
  Container,
  Box,
  Flex,
  Button,
  Text,
  TextInput,
  PasswordInput,
} from "@mantine/core";
import { useForm, isEmail } from "@mantine/form";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import NavBar from "components/NabBar";
import { LinkIcon } from "lucide-react";
export const meta: MetaFunction = () => {
  return [
    {
      title: "Savon |Login",
    },
    {
      name: "description",
      content: ` savon | Begin your venture into world of photographs`,
    },
  ];
};
type LoginValues = { email: string; password: string };
export default function SavonLogin() {
  const [loading, setLoading] = React.useState(false);
  const form = useForm<LoginValues>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: isEmail("Invalid email"),
      password: (value) =>
        value.trim().length < 6
          ? "Enter a password wit atleast 6 characters"
          : null,
    },
  });
  const handleSubmit = (values: FormValues) => {
    if (form.isValid()) {
      alert("send to server...");
    }
  };
  return (
    <Container size="lg" className="min-h-screen">
      <NavBar isHome={false} />
      <Box className="flex flex-col items-center justify-center">
        <Box
          className="mx-auto p-8 md:p-20 border-red "
          mt="lg"
          maw={{ base: "100%", md: 380 }}
        >
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Text py="md" fw="bold">
              Create a Savon Account
            </Text>
            <Flex direction="column" rowGap={"md"}>
              <TextInput
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                key={form.key("email")}
                {...form.getInputProps("email")}
              />
              <PasswordInput
                visible={false}
                visibilityToggleIcon={() => null}
                withAsterisk
                label="Password"
                placeholder="Enter password"
                key={form.key("password")}
                {...form.getInputProps("password")}
              />
              <Button fullWidth>Login</Button>
            </Flex>

            <Box py="md">
              <Link className="text-blue-500 pt-2 text-center" to="/signup">
                {"Don't have  an account? "} <LinkIcon className="ml-2" />
              </Link>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
}
