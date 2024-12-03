import { Container, Button, Flex, Title, Box } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import { useQuery } from "@tanstack/react-query";
import { fetchPayload } from "api";
import AddPhoto from "components/AddPhoto";
import ApperrorMessage from "components/ApperrorMessage";
import AppLoader from "components/AppLoader";
import AppModal from "components/AppModal";
import SavonBreadCrumb from "components/beadcrumb";
import NavBar from "components/NabBar";
import NotLoggedIn from "components/NotLoggedIn";
import UserPhotos from "components/UIserPhotos";
import { BASE_URL } from "config";
import { useAppContext } from "Providers/appProvider";
import React from "react";
import { Album } from "types";
export const meta: MetaFunction = () => {
  return [
    {
      title: "Savon |albums",
    },
    {
      name: "description",
      content: ` savon | view user albums`,
    },
  ];
};
export default function AlbumPage() {
  const [showModal, setShow] = React.useState(false);
  const { id } = useParams();
  const { user } = useAppContext();

  // get the album itself
  const { data: album } = useQuery({
    queryKey: ["album", id],
    queryFn: (id) => {
      const { queryKey } = id;
      const photoUrl = BASE_URL + `/albums?album=${queryKey[1]}`;
      return fetchPayload(photoUrl);
    },
  });
  // get  photos inside the album

  const {
    data: photos,
    isLoading: photosLoading,
    isError: photosError,
    refetch,
  } = useQuery({
    queryKey: [id],
    queryFn: (id) => {
      const { queryKey } = id;

      const photoUrl = BASE_URL + `/photos?albumId=${queryKey[0]}`;
      return fetchPayload(photoUrl);
    },
  });

  // get the userr whose album is being viewed
  const { data: albumUser } = useQuery({
    queryKey: ["user", album?.user_id],
    queryFn: (id) => {
      const { queryKey } = id;

      const photoUrl = BASE_URL + `/users/${queryKey[1]}`;
      return fetchPayload(photoUrl);
    },
  });

  // close the modal someone add a picture
  const handleModalClosure = () => {
    refetch();

    setShow(false);
  };

  return (
    <Container p="lg" pt="lg" size="lg" className="min-h-screen">
      {/**Add photo modal */}
      <AppModal opened={showModal} onClose={() => setShow(false)}>
        <AddPhoto onClose={handleModalClosure} id={id ?? ""} />
      </AppModal>
      <NavBar isHome={false} />

      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        mt="lg"
      >
        <SavonBreadCrumb breadcrumbs={[{ url: "/home", link: "Home" }]} />
        {album && (
          <AddImageComponent album={album} setShow={() => setShow(true)} />
        )}
      </Flex>

      <NotLoggedIn />
      <Box mt="lg" pt="lg">
        {/*fetch users*/}

        {photosError ? (
          <ApperrorMessage message="something went wrong while loading photos" />
        ) : null}
        {photosLoading ? <AppLoader message="Loading album photos" /> : null}
        {/**whene there no users */}
        {Array.isArray(photos) && photos.length === 0 && (
          <Title order={5}>
            There are no photos on the system for the selected {album?.title}{" "}
            album{" "}
            <span className="ml-2 text-accent ">
              {albumUser
                ? `by ${
                    user?.user?.id == albumUser?.id
                      ? "you"
                      : albumUser?.username
                  }`
                : ""}
            </span>
          </Title>
        )}

        {Array.isArray(photos) && photos.length > 0 && (
          <Box>
            <p className="py-3 text-xl">
              {photos.length} {photos.length === 1 ? "picture" : "pictures"} on
              {"  "}
              {album?.title} album{" "}
              <span className="ml-2 text-accent ">
                {" "}
                {albumUser
                  ? `by ${
                      user?.user?.id == albumUser?.id
                        ? "you"
                        : albumUser?.username
                    }`
                  : ""}
              </span>
            </p>
            <UserPhotos photos={photos} album={album} />
          </Box>
        )}
      </Box>
    </Container>
  );
}
const AddImageComponent = ({
  album,
  setShow,
}: {
  album: Album;
  setShow: () => void;
}) => {
  const { user } = useAppContext();
  if (user?.user?.id !== album.user_id) return null;
  return (
    <Button className="!bg-accent !text-white" onClick={setShow}>
      Add Image
    </Button>
  );
};
