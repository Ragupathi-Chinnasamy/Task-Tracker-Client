import { Modal as MantineModal, MantineSize } from "@mantine/core";
import React from "react";

function Modal({
  title,
  modalSize,
  isModalOpen,
  onClose: resetForm,
  children,
}: {
  title: string;
  modalSize: MantineSize;
  isModalOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <MantineModal
      opened={isModalOpen}
      onClose={resetForm}
      title={<p className="font-bold text-lg m-0">{title}</p>}
      transitionProps={{
        transition: "fade",
        duration: 100,
        timingFunction: "linear",
      }}
      size={modalSize}
    >
      {children}
    </MantineModal>
  );
}

export default Modal;
