import { Center, Container, Grid, Title, Box } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { fetchPayload } from "api";
import AlbumsList from "components/AlbumsList";
import ApperrorMessage from "components/ApperrorMessage";
import AppLoader from "components/AppLoader";
import NavBar from "components/NabBar";
import NotLoggedIn from "components/NotLoggedIn";
import UsersList from "components/UsersList";
import { BASE_URL } from "config";
import { useAppContext } from "Providers/appProvider";
import React from "react";

import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Savon |Home",
    },
    {
      name: "description",
      content: ` savon | welcome to savon where pictures meet users`,
    },
  ];
};
export default function Home() {
  const { user } = useAppContext();
  const [id, setId] = React.useState(user?.user?.id ?? 0);

  const usersurl = BASE_URL + "/users";
  // all albums
  // users
  const {
    data: users,
    isLoading: usersLoading,
    isError,
  } = useQuery({ queryKey: ["users"], queryFn: () => fetchPayload(usersurl) });

  //user albums
  const {
    data: albums,
    isLoading: albumsLoading,
    isError: albumError,
  } = useQuery({
    queryKey: [id],
    queryFn: (id) => {
      const { queryKey } = id;
      if (queryKey[0] === 0) return [];
      const albumUrl = BASE_URL + `/albums/${queryKey[0]}`;
      return fetchPayload(albumUrl);
    },
  });

  const handleClickedUser = (id: number) => {
    setId(id);
  };
  const loggedIn = id === user?.user?.id;
  return (
    <Container className="min-h-screen bg-secondary" size="lg">
      <NavBar isHome />
      <NotLoggedIn />
      <Grid mt="lg" pt="lg">
        {/*fetch users*/}
        <Grid.Col span={{ base: 12, md: 8 }}>
          {" "}
          <Box>
            {" "}
            {isError ? <ApperrorMessage /> : null}
            {usersLoading ? <AppLoader message="Loading Savon Users" /> : null}
            {/**whene there no users */}
            {Array.isArray(users) && users.length === 0 && (
              <Title order={5}>There are no users on the system </Title>
            )}
            <Center>
              {Array.isArray(users) && users.length > 0 && (
                <UsersList
                  users={users}
                  clickedUser={handleClickedUser}
                  id={id}
                />
              )}
            </Center>
          </Box>
        </Grid.Col>
        {/** albums For individual users */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Center>
            {" "}
            {albumError ? <ApperrorMessage /> : null}
            {albumsLoading ? <AppLoader message="Loading albums" /> : null}
            {/**whene there no users */}
            {Array.isArray(albums) && albums.length === 0 && (
              <Title order={5}>
                {loggedIn ? "add albums above" : "No albums found."}{" "}
              </Title>
            )}
          </Center>

          <Center>
            {Array.isArray(albums) && albums.length > 0 && (
              <AlbumsList albums={albums} iam={loggedIn} />
            )}
          </Center>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
