import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Text,
  Title,
  Image,
  Center,
} from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import { Link, useParams } from "@remix-run/react";
import { useQuery } from "@tanstack/react-query";
import { fetchPayload } from "api";
import AddPhoto from "components/AddPhoto";
import ApperrorMessage from "components/ApperrorMessage";
import AppLoader from "components/AppLoader";
import AppModal from "components/AppModal";
import SavonBreadCrumb from "components/beadcrumb";
import NavBar from "components/NabBar";
import NotLoggedIn from "components/NotLoggedIn";
import { BASE_URL } from "config";

import React from "react";
export const meta: MetaFunction = () => {
  return [
    {
      title: "Savon |albums",
    },
    {
      name: "description",
      content: ` savon | welcome to savon where pictures meet users`,
    },
  ];
};
type PhotoProps = { title: string; id: number };

export default function Photopage() {
  const [showModal, setShow] = React.useState(false);
  const { id } = useParams();

  // get users photos

  const {
    data: photo,
    isLoading: photoLoading,
    isError: photoError,
    refetch,
  } = useQuery({
    queryKey: [id],
    queryFn: (id) => {
      const { queryKey } = id;

      const photoUrl = BASE_URL + `/photos/${queryKey[0]}`;
      return fetchPayload(photoUrl);
    },
  });

  const handleModalClosure = () => {
    refetch();
    setShow(false);
  };

  return (
    <Container p="lg" pt="lg" size="lg">
      {/**Add photo modal */}
      <AppModal opened={showModal} onClose={() => setShow(false)}>
        <AddPhoto onClose={handleModalClosure} id={id ?? ""} edit={true} />
      </AppModal>

      <NavBar isHome={false} />

      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        mt="lg"
        gap="md"
      >
        <SavonBreadCrumb
          breadcrumbs={[{ url: `/albums/${id ?? 0}`, link: "Return Albums" }]}
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

        {photoError ? (
          <ApperrorMessage message="something went wrong while loading photo" />
        ) : null}
        {photoLoading ? <AppLoader message="Loading photo..." /> : null}
        {/**whene there no users */}
        {Array.isArray(photo) && photo.length === 0 && (
          <Title order={5}>No photo for the selected album </Title>
        )}

        {photo && (
          <Center>
            <CardPhoto photo={photo} openModal={() => setShow(true)} />
          </Center>
        )}
      </Box>
    </Container>
  );
}
const CardPhoto = ({
  photo,
  openModal,
}: {
  photo: PhotoProps;
  openModal: () => void;
}) => {
  return (
    <Card
      miw={{ base: "100%", md: 400 }}
      h={{ base: 200, md: 400 }}
      className="border-red relative cursor-pointer"
      withBorder
    >
      <Image
        src="/tanja-cotoaga-0L05c7TSCME-unsplash.jpg"
        fit="contain"
        h={{ base: 200, md: 400 }}
        w={{ base: "100%", md: 400 }}
        alt={photo.title}
      />
      <Text className="absolute bottom-2 !capitalize text-center left-[20%] py-2 !text-white  font-bold !text-2xl">
        {photo.title}
      </Text>
      <Button
        onClick={openModal}
        className="!bg-accent !text-white"
        fullWidth
        px="lg"
        mt="lg"
      >
        Edit {photo.title}
      </Button>
      <Flex justify={{ base: "flex-start", md: "flex-end" }} pt="md">
        <Link to="/home" className="text-blue-600">
          Return to home page
        </Link>
      </Flex>
    </Card>
  );
};
