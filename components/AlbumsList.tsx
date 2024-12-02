import { List, ListItem, Box, Title } from "@mantine/core";

import { Album } from "types";

export default function AlbumsList({
  albums,
  iam,
}: {
  albums: Album[];
  iam: boolean;
}) {
  return (
    <Box>
      <Title py="md" order={3}>
        {iam ? "Your " : ""}
        {albums.length} albums returned
      </Title>
      <List spacing={"md"} withPadding>
        {albums.map((album, i) => (
          <ListItem key={album.id}>
            {" "}
            {i + 1}. {"  "} {album.title}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
