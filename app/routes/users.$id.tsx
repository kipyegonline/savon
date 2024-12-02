import { Box, Card, Container, Flex, SimpleGrid, Title } from "@mantine/core";

import { useParams } from "@remix-run/react";
import { useQuery } from "@tanstack/react-query";
import { fetchPayload } from "api";

import ApperrorMessage from "components/ApperrorMessage";
import AppLoader from "components/AppLoader";

import SavonBreadCrumb from "components/beadcrumb";
import NavBar from "components/NabBar";
import NotLoggedIn from "components/NotLoggedIn";
import { BASE_URL } from "config";
import type { MetaFunction } from "@remix-run/node";
import { useAppContext } from "Providers/appProvider";
import AlbumsList from "components/AlbumsList";
import { User2, MailCheckIcon, Calendar } from "lucide-react";
import { User } from "types";
export const meta: MetaFunction = () => {
  return [
    {
      title: "Savon |User",
    },
    {
      name: "description",
      content: ` savon | welcome to savon where pictures meet users`,
    },
  ];
};
export default function Userpage() {
  const { user } = useAppContext();
  const { id } = useParams();

  // get user
  //user albums
  const {
    data: _user,
    isLoading: _userLoading,
    isError: _userError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      const albumUrl = BASE_URL + `/users/${id}`;
      return fetchPayload(albumUrl);
    },
  });

  //user albums
  const {
    data: albums,
    isLoading: albumsLoading,
    isError: albumError,
  } = useQuery({
    queryKey: [id],
    queryFn: () => {
      const albumUrl = BASE_URL + `/albums/${id}`;
      return fetchPayload(albumUrl);
    },
  });

  const loggedIn = id === user?.user?.id;

  return (
    <Container p="lg" pt="lg" size="lg" className="min-h-screen">
      <NavBar isHome={false} />

      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        mt="lg"
        gap="md"
      >
        <SavonBreadCrumb
          breadcrumbs={[{ url: `/home`, link: "Return home" }]}
        />
      </Flex>

      <NotLoggedIn />
      <SimpleGrid cols={{ base: 1, md: 2 }} mt="lg " p="md">
        <Box>
          {_userError ? (
            <ApperrorMessage message="something went wrong while loading user" />
          ) : null}
          {_userLoading ? (
            <AppLoader message="Loading user..." type="dots" />
          ) : null}
          {_user ? <UserProfile _user={_user} /> : null}
        </Box>

        <Box>
          {/*fetch users*/}

          {albumError ? (
            <ApperrorMessage message="something went wrong while loading album" />
          ) : null}
          {albumsLoading ? (
            <AppLoader message="Loading user albums..." type="dots" />
          ) : null}
          {/**whene there no users */}
          {Array.isArray(albums) && albums.length === 0 && (
            <Title order={5}>No allbums for the selected user </Title>
          )}

          {Array.isArray(albums) && albums.length > 0 && (
            <Card className="!text-white !bg-accent p-4" withBorder shadow="md">
              <AlbumsList albums={albums} iam={loggedIn} />
            </Card>
          )}
        </Box>
      </SimpleGrid>
    </Container>
  );
}

const UserProfile = ({ _user }: { _user: User }) => {
  return (
    <Box className="!text-white !bg-accent mx-auto max-w-[400px] p-4">
      <Card className="!text-white !bg-accent " p="md" withBorder shadow="md">
        <Title order={3}>
          <User2 className="mr-4 inline-block text-secondary " />
          {_user?.username}
        </Title>
        <Title order={3}>
          {" "}
          <MailCheckIcon className="mr-4 inline-block text-secondary " />{" "}
          {_user?.email}
        </Title>
        <Title order={3}>
          <Calendar className="mr-4 inline-block text-secondary " />{" "}
          {new Date(_user?.created_at).toLocaleDateString()}
        </Title>
      </Card>
    </Box>
  );
};
