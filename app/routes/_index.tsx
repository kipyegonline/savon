import { BackgroundImage, Container } from "@mantine/core";

import type { MetaFunction } from "@remix-run/node";
import ActionCards from "components/ActionCards";
import Hero from "components/hero";
import NavBar from "components/NabBar";
import data from "config/data";

export const meta: MetaFunction = () => {
  return [
    {
      title: data.title,
    },
    { name: "description", content: ` savon | ${data.description}` },
  ];
};

export default function Index() {
  return (
    <>
      <BackgroundImage
        className=""
        src="./tanja-cotoaga-0L05c7TSCME-unsplash.jpg"
      >
        <Container className="" size="lg" pb="lg">
          {/**nav bar */}
          <NavBar isHome />

          {/**Hero */}
          <Hero />
          {/**Action cards */}
          <ActionCards />
          {/**Footer */}
        </Container>
      </BackgroundImage>
    </>
  );
}
