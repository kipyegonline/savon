import { Notification } from "@mantine/core";
import Colors from "config/Colors";

type Props = { message: string; success: boolean };
export function SavonNotification({ message, success }: Props) {
  return (
    <Notification
      title={success ? "Succcess" : "Error"}
      color={success ? Colors.light.accent : "red"}
    >
      {message}
    </Notification>
  );
}
