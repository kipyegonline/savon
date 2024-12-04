import { ActionIcon } from "@mantine/core";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
type Props = { show: boolean; setShow: () => void };

const VisibilityIcon = ({ setShow, show }: Props) => {
  return (
    <ActionIcon onClick={setShow} size={"md"}>
      {show ? <EyeClosedIcon color={"black"} /> : <EyeIcon color={"black"} />}
    </ActionIcon>
  );
};
export default VisibilityIcon;
