import { Card, Flex, Image, Text } from "@mantine/core";
import { useNavigate } from "@remix-run/react";
type Photo = { id: number; title: string };
export default function UserPhotos({ photos }: { photos: Photo[] }) {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      wrap={{ base: "nowrap", md: "wrap" }}
      gap="sm"
      align="center"
    >
      {photos.map((photo) => (
        <UserPhoto key={photo.id} photo={photo} />
      ))}
    </Flex>
  );
}

const UserPhoto = ({ photo }: { photo: Photo }) => {
  const navigate = useNavigate();

  const gotToPic = (id: number) => {
    navigate(`/photo/${id}`);
  };
  return (
    <Card
      miw={{ base: "100%", md: 300 }}
      h={200}
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
      <Text className="absolute bottom-2 !capitalize text-center left-[20%] py-2 !text-white  font-bold !text-2xl">
        {photo.title}
      </Text>
    </Card>
  );
};
