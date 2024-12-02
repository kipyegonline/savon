import { Button, Flex, Box, Title, Avatar, ActionIcon } from "@mantine/core";

import SavonLogo from "./logo";
import { useNavigate } from "@remix-run/react";
import { useAppContext } from "Providers/appProvider";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL, submitPayload } from "config";
import React from "react";
import { LogOut } from "lucide-react";
import Colors from "config/Colors";

export default function NavBar({ isHome = false }: { isHome: boolean }) {
  const { user } = useAppContext();

  return (
    <header className=" ">
      <Flex
        align="center"
        justify={"space-between"}
        pt="sm"
        direction={{ base: user ? "column" : "row", md: "row" }}
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
        <InsideMenu />
        {isHome ? (
          user ? (
            <UserAvatar name={user?.user?.username} />
          ) : (
            <LoginButton />
          )
        ) : null}
      </Flex>
    </header>
  );
}
const UserAvatar = ({ name }: { name: string }) => {
  const { _removerUser } = useAppContext();
  const logOut = () => {
    if (confirm("Log out")) {
      _removerUser();
      location.pathname = "/login";
    }
  };
  return (
    <Box className="flex items-center gap-2">
      <Avatar name={name} color="initials" size="lg" />
      <ActionIcon onClick={logOut}>
        <LogOut color={Colors.light.secondary} />
      </ActionIcon>
    </Box>
  );
};

const LoginButton = () => {
  const navigate = useNavigate();

  const handlelogin = () => {
    navigate("/signup");
  };
  return (
    <Box className=" o">
      <Button
        bg="accent"
        className=" rounded-2xl w-40 h-28 "
        px="lg"
        onClick={handlelogin}
      >
        Sign in
      </Button>
    </Box>
  );
};
type AlbumProp = Record<string, string>;
const InsideMenu = () => {
  const [added, setAdded] = React.useState(false);
  const { user } = useAppContext();
  const url = BASE_URL + "/albums";

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (values: AlbumProp) => await submitPayload(url, values),
  });
  React.useEffect(() => {
    if (isSuccess) {
      setAdded(true);
      setTimeout(() => setAdded(false), 3000);
    }
  }, [isSuccess]);
  const addAlbum = () => {
    const name = prompt("Enter album name");
    if (name && name?.trim().length > 3) {
      mutate({ title: name, user_id: user?.user?.id + "" });
    }
  };

  if (user == null) return null;
  return (
    <Flex gap="lg" align={"center"} direction={{ base: "column", md: "row" }}>
      <Title order={3}>Welcome {user?.user?.username}</Title>
      <Button
        className="text-white !bg-accent !w-full md:!w-40 "
        onClick={addAlbum}
        loading={isPending}
      >
        Add Album
      </Button>
      {added && <span className="text-accent">Album added successfully</span>}
    </Flex>
  );
};
