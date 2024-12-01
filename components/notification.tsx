import { Notification } from "@mantine/core";
import Colors from "config/Colors";

type Props = { message: string; success: boolean };
export function SavonNotification({ message, success }: Props) {
  return (
    <Notification
      title={success ? "Succcess" : "Error"}
      color={Colors.light.accent}
    >
      {success ? message : "Something went wrong, try again later"}
    </Notification>
  );
}
