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
import React from "react";
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

  // get users albums photos

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
      <Box>
        <p>You can only edit a photo you added</p>
      </Box>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        mt="lg"
      >
        <SavonBreadCrumb
          breadcrumbs={[{ url: "/home", link: "Return Home" }]}
        />
        <Button
          className="!bg-accent !text-white"
          onClick={() => setShow(true)}
        >
          Add Image
        </Button>
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
            There are no photos on the system for the selected album{" "}
          </Title>
        )}

        {Array.isArray(photos) && photos.length > 0 && (
          <UserPhotos photos={photos} />
        )}
      </Box>
    </Container>
  );
}
