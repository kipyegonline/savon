import { Alert } from "@mantine/core";
import Colors from "config/Colors";
import { AlertCircle } from "lucide-react";

export default function ApperrorMessage({
  message = " Something went wrong while loading, try again later",
}: {
  message?: string;
}) {
  return (
    <Alert
      variant="light"
      color={Colors.light.accent}
      title="Eror"
      icon={<AlertCircle />}
    >
      {message}
    </Alert>
  );
}
