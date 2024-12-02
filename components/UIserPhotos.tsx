import { Card, Flex, Image, Text, Box } from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import SocialMediaShare from "./SocialMediaShare";
import { Album } from "types";
type Photo = { id: number; title: string };
export default function UserPhotos({
  photos,
  album,
}: {
  photos: Photo[];
  album: Album;
}) {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      wrap={{ base: "nowrap", md: "wrap" }}
      gap="sm"
      align="center"
    >
      {photos.map((photo) => (
        <UserPhoto key={photo.id} photo={photo} userId={album?.user_id} />
      ))}
    </Flex>
  );
}

const UserPhoto = ({ photo, userId }: { photo: Photo; userId: number }) => {
  const navigate = useNavigate();

  const gotToPic = (id: number) => {
    navigate(`/photo/${id}?q=${userId}`);
  };
  return (
    <Card
      miw={{ base: "100%", md: 300 }}
      h={{ base: "auto", md: 200 }}
      className="border-red relative cursor-pointer"
      withBorder
      onClick={() => gotToPic(photo.id)}
    >
      <Image
        src="/tanja-cotoaga-0L05c7TSCME-unsplash.jpg"
        fit="contain"
        h={200}
        w={{ base: "100%", md: 300 }}
        alt={photo.title}
      />
      <Text className="absolute bottom-4 md:bottom-2 !capitalize text-center left-[20%] py-2 !text-white  font-bold !text-2xl">
        {photo.title}
      </Text>
      <Box className="absolute top-4 right-2 mt-2 mr-2">
        <SocialMediaShare title={photo.title} />
      </Box>
    </Card>
  );
};
