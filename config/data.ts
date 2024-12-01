import { Album, PictureInPicture, User } from "lucide-react";

export default {
  title: "Your personal photo album, online",
  description:
    "Share your life's moments using savon, join community of photography enthusiasts.",
  hero: {
    heading: "Connect Through Photos",
    description:
      "Capture life's precious moments and share them with the world.",
  },
  cards: [
    {
      name: "Users",
      title: " Connect with Friends and Family",
      description:
        "Discover new people, follow friends, and build your social network.",
      icon: User,
    },
    {
      name: " Albums ",
      title: "Organize Your Photos",
      description: "Create beautiful albums to showcase your memories.",
      icon: Album,
    },
    {
      name: " Photos",
      title: "Share Your Moments",
      description:
        " Upload your photos, add captions, and share them with the world.",
      icon: PictureInPicture,
    },
  ],
  footer: {},
};
