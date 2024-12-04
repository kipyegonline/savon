import React from "react";
import {
  Container,
  Box,
  Flex,
  Button,
  Title,
  TextInput,
  PasswordInput,
} from "@mantine/core";
import { useForm, isEmail } from "@mantine/form";

import { Link, useNavigate } from "@remix-run/react";
import NavBar from "components/NabBar";
import { ExternalLinkIcon } from "lucide-react";
import VisibilityIcon from "components/VisibilityIcon";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL, submitPayload } from "config";
import { SavonNotification } from "components/notification";
import { useAppContext } from "Providers/appProvider";
import { IUser } from "types";
import type { MetaFunction } from "@remix-run/node";
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
type DefaultState = { success: string; error: string };

const defaultState: DefaultState = { success: "", error: "" };
export default function SavonLogin() {
  const [show, setShow] = React.useState(false);
  const [status, setStatus] = React.useState(defaultState);

  const url = BASE_URL + "/login";
  const navigate = useNavigate();
  const { _setUser, user } = useAppContext();

  const confirmStatus = (nextState: Partial<DefaultState>) => {
    setStatus({ ...defaultState, ...nextState });
  };
  // tunajenga form na hii method
  const form = useForm<LoginValues>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: isEmail("Kindly enter a valid email address"),
      password: (value) =>
        value.trim().length < 6
          ? "Enter a password wit atleast 6 characters"
          : null,
    },
  });
  // tutatumia hii kusend payload kwa api

  const {
    mutate,
    isPending: isLoading,

    data,
  } = useMutation({
    mutationFn: async (values: LoginValues) => await submitPayload(url, values),
    onSuccess: () => {},
    onError: () => {
      confirmStatus({ error: "something went wrong" });
      setTimeout(() => setStatus(defaultState), 3000);
    },
  });

  const handleSubmit = (values: LoginValues) => {
    if (form.isValid()) {
      mutate(values);
    }
  };

  React.useEffect(() => {
    //no need to log in if logged in

    if (user) {
      location.pathname = "/home";
      return;
    }
  }, []);
  React.useEffect(() => {
    // WE LISTEN FOR DATA CHANGES, NIMECHOKA MAHN

    if (data) {
      if ("message" in data) {
        confirmStatus({ error: data.message });

        setTimeout(() => setStatus(defaultState), 3000);
      } else {
        // SEND TO APP CONTEXT
        form.reset(), form.clearErrors();
        _setUser(data as IUser);
        navigate("/home");
      }
    }
  }, [data]);
  return (
    <Container size="lg" className="min-h-screen">
      <NavBar isHome={false} />
      <Box className="flex flex-col items-center justify-center">
        <Box
          className="mx-auto p-8 md:p-16 "
          mt="lg"
          maw={{ base: "100%", md: 380 }}
        >
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Title order={3} py="md">
              Welcome back
            </Title>
            <Box mb="md">
              <img src="/logo-light.png" alt="" />
            </Box>
            <Flex direction="column" rowGap={"md"}>
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
              <Button fullWidth loading={isLoading} type="submit">
                Login
              </Button>

              {/** show user notifications */}
              {status.success && (
                <SavonNotification success={true} message={status.success} />
              )}
              {status.error && (
                <SavonNotification success={!true} message={status.error} />
              )}
            </Flex>

            <Box py="md">
              <Link className="text-blue-500 pt-2 text-center" to="/signup">
                {"Don't have  an account? "}{" "}
                <ExternalLinkIcon size={18} className="ml-2" />
              </Link>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  );
}
