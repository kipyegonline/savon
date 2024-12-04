import {
  Container,
  Box,
  TextInput,
  Button,
  Flex,
  PasswordInput,
  Text,
  Card,
} from "@mantine/core";

import type { MetaFunction } from "@remix-run/node";
import { Link, useNavigate } from "@remix-run/react";
import NavBar from "components/NabBar";
import { ExternalLink } from "lucide-react";
import { useForm, isEmail } from "@mantine/form";
import { BASE_URL, submitPayload } from "config";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { SavonNotification } from "components/notification";
import VisibilityIcon from "components/VisibilityIcon";

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
      content: ` Savon | Begin your venture into world of photographs`,
    },
  ];
};
type DefaultState = { success: string; error: string };

const defaultState: DefaultState = { success: "", error: "" };

export default function SavonLogin() {
  const url = BASE_URL + "/users";

  const [show, setShow] = React.useState(false); // when a suser wants to see their password on inoput
  const [status, setStatus] = React.useState(defaultState); // ui feedback

  const navigate = useNavigate();
  // function user feedback
  const UpdateState = (nextState: Partial<DefaultState>) => {
    setStatus({
      ...defaultState,
      ...nextState,
    });
  };
  // do the actual sign up
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async (values: FormValues) => await submitPayload(url, values),
    onSuccess: () => {
      UpdateState({
        success: "account created successfully, redirecting shortly",
      });
      setTimeout(() => {
        setStatus(defaultState), navigate("/login");
      }, 3000);
      form.reset(), form.clearErrors();
    },
    onError: () => {
      UpdateState({ error: "something went wrong" });
      setTimeout(() => setStatus(defaultState), 3000);
    },
  });

  // build the form
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

  const handleSubmit = async (values: FormValues) => {
    if (form.isValid()) {
      mutate(values);
    }
  };

  return (
    <Container size="lg" className="min-h-screen">
      <NavBar isHome={false} />
      <Card
        className="mx-auto p-8   bg-white"
        mt="lg"
        maw={{ base: "100%", md: 380 }}
        shadow="lg"
        withBorder
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Text py="md" fw="bold">
            Create Savon account, join the fun
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
              visible={show}
              visibilityToggleIcon={() => (
                <VisibilityIcon
                  show={show}
                  setShow={() => setShow((prev) => !prev)}
                />
              )}
              withAsterisk
              label="Password"
              placeholder="Enter password"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
            <PasswordInput
              visible={show}
              visibilityToggleIcon={() => (
                <VisibilityIcon
                  show={show}
                  setShow={() => setShow((prev) => !prev)}
                />
              )}
              withAsterisk
              label="Password confirmation"
              placeholder="Enter password confirmation"
              key={form.key("password_confirmation")}
              {...form.getInputProps("password_confirmation")}
            />

            <Button
              fullWidth
              c="white"
              className="text-white"
              type="submit"
              loading={isLoading}
            >
              {isLoading ? "Submitting" : "Sign up"}
            </Button>

            {/** show user notifications */}
            {status.success && (
              <SavonNotification success={true} message={status.success} />
            )}
            {status.error && (
              <SavonNotification success={true} message={status.error} />
            )}
          </Flex>
          <Box className="pt-4 flex items-center gap-2">
            {" "}
            <Link className="text-blue-600 pt-2 text-center" to="/login">
              Already have an account?
            </Link>{" "}
            <ExternalLink className="ml-2 text-blue-600" size={18} />
          </Box>
        </form>
      </Card>
    </Container>
  );
}
