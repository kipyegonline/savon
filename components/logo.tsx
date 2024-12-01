import { Box } from "@mantine/core";
import { Link } from "@remix-run/react";

export default function SavonLogo() {
  return (
    <Link to="/">
      {" "}
      <Box>
        <img src="/favicon.ico" alt="savon" className="w-20 h-16" />
      </Box>
    </Link>
  );
}
