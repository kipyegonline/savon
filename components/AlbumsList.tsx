import { List, ListItem, Box, Title } from "@mantine/core";
import { Link } from "@remix-run/react";
import { ExternalLink } from "lucide-react";

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
            <Link to={`/albums/${album.id}`}>
              {" "}
              <span className="mr-2">{i + 1}.</span> {"  "} {album.title}{" "}
              <ExternalLink size={14} className="inline-block ml-2" />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
