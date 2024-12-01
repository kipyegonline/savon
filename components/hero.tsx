import { Box } from "@mantine/core";
import data from "config/data";

export default function Hero() {
  return (
    <Box
      className="p-8 md:p-24 text-white backdrop-blur-sm flex flex-col md:flex-row "
      my="lg"
    >
      <Box className="w-full md:w-[70%]">
        {" "}
        <h1
          //order={1}
          className="text-4xl  md:text-5xl  font-bold  leading-loose py-2"
        >
          {data.hero.heading}
        </h1>
        <h1 className="text-3xl font-medium leading-tight">
          {data.hero.description}
        </h1>
      </Box>
      <Box className="-order-1 md:order-1">
        <img src="/camera.png" alt="" className="w-[280px] h-[200px]" />
      </Box>
    </Box>
  );
}
