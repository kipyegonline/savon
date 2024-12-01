import { Card, SimpleGrid, Title, Box, Text } from "@mantine/core";
import data from "config/data";

export default function ActionCards() {
  return (
    <SimpleGrid cols={{ base: 1, md: 3 }}>
      {data.cards.map((card) => (
        <ActionCard key={card.name} card={card} Icon={<card.icon />} />
      ))}
    </SimpleGrid>
  );
}
type CardProps = {
  name: string;
  title: string;
  description: string;
  // icon: React.ReactNode;
};
const ActionCard = ({
  card,
  Icon,
}: {
  card: CardProps;
  Icon: React.ReactNode;
}) => {
  return (
    <Card
      className="bg-white p-8 rounded-3xl flex flex-col items-center justify-center"
      shadow="lg"
      withBorder
      maw={320}
      py={"lg"}
    >
      {Icon}

      <Title order={2}>{card.title}</Title>
      <Box>
        <Text>{card.description}</Text>
      </Box>
    </Card>
  );
};
