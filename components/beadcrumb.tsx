import { Breadcrumbs, Box } from "@mantine/core";
import { Link } from "@remix-run/react";
import { ArrowBigLeft } from "lucide-react";

type BreadCrumbs = { url: string; link: string };

export default function SavonBreadCrumb({
  breadcrumbs,
}: {
  breadcrumbs: BreadCrumbs[];
}) {
  return (
    <Box bg="white" py="sm" className="border-b border-color-accent px-2">
      <Breadcrumbs separator="/" separatorMargin={"md"}>
        {breadcrumbs.map((bread) => (
          <Link key={bread.link} to={bread.url} className="color-blue-600">
            <ArrowBigLeft className="inline-block text-accent" /> {bread.link}
          </Link>
        ))}
      </Breadcrumbs>
    </Box>
  );
}
