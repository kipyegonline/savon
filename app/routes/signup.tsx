import {
  Container,
  Box,
  TextInput,
  Button,
  Flex,
  PasswordInput,
  Text,
} from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import NavBar from "components/NabBar";
import { Link2Off } from "lucide-react";
import { useForm, isEmail } from "@mantine/form";

type FormValues = {
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
};
export const meta: MetaFunction = () => {
  return [
    {
      title: "Savon |Sign up",
    },
    {
      name: "description",
      content: ` savon | Begin your venture into world of photographs`,
    },
  ];
};
export default function SavonLogin() {
  const form = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      password_confirmation: "",
      username: "",
    },

    validate: {
      email: isEmail("Invalid email"),
      password: (value) =>
        value.trim().length < 6
          ? "Enter a password wit atleast 6 characters"
          : null,
      username: (value) =>
        value.trim().length < 3
          ? "Enter a username wit atleast 3 characters"
          : null,
      password_confirmation: (value, values) =>
        value.trim() !== values.password ? "Passwords do not match" : null,
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
      <Box
        className="mx-auto p-8  border-red"
        mt="lg"
        maw={{ base: "100%", md: 380 }}
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Text py="md" fw="bold">
            Create Savon Account
          </Text>
          <Flex direction="column" rowGap={"md"}>
            <TextInput
              withAsterisk
              label="Username"
              placeholder="Enter username"
              key={form.key("username")}
              {...form.getInputProps("username")}
            />
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
            <PasswordInput
              visible={false}
              visibilityToggleIcon={() => null}
              withAsterisk
              label="Password confirmation"
              placeholder="Enter password confirmation"
              key={form.key("password_confirmation")}
              {...form.getInputProps("password_confirmation")}
            />

            <Button fullWidth c="white" className="text-white" type="submit">
              Sign up
            </Button>
          </Flex>
          <Box className="pt-4">
            {" "}
            <Link className="text-blue-500 pt-2 text-center" to="/login">
              Already have an account? <Link2Off className="ml-2" />
            </Link>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
