import { Modal } from "@mantine/core";
import React from "react";

type Props = {
  onClose: () => void;
  opened: boolean;
  children: React.ReactNode;
};

export default function AppModal({ opened, onClose, children }: Props) {
  return (
    <Modal opened={opened} onClose={onClose}>
      {children}
    </Modal>
  );
}
