import { Flex } from "@mantine/core";
import {
  EmailShareButton,
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  PinterestIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

export default function SocialMediaShare({ title }: { title: string }) {
  const url = "https://savon-one.vercel.app/";
  const size = 24;
  return (
    <Flex gap="xs">
      <EmailShareButton subject={title} url={url}>
        <EmailIcon size={size} className="rounded-md" />
      </EmailShareButton>

      <PinterestShareButton title={title} url={url} media={title}>
        <PinterestIcon size={size} className="rounded-md" />
      </PinterestShareButton>
      <TwitterShareButton title={title} url={url}>
        <TwitterIcon size={size} className="rounded-md" />
      </TwitterShareButton>
      <WhatsappShareButton title={title} url={url}>
        <WhatsappIcon size={size} className="rounded-md" />
      </WhatsappShareButton>
      <FacebookShareButton hashtag={title} url={url}>
        <FacebookIcon size={size} className="rounded-md" />
      </FacebookShareButton>
    </Flex>
  );
}
