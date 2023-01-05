import * as React from "react";
import { nameModal } from "const";
import { ModalLayout } from "layout";
import { AppContextInterface } from "types";
import { ContextApp } from "context";
import { Modal } from "antd";

export interface ModalAppProps {
  children?: React.ReactElement;
}

const handleGetCurrentModal = (type: string) => {
  switch (type) {
    case nameModal.MODAL_LAYOUT:
      return ModalLayout;
    default:
      return null;
  }
};
export default function ModalApp(props: ModalAppProps) {
  console.log("render");
  const { currentModal, setCurrentModal } = React.useContext(ContextApp);
  console.log({ currentModal });
  // const stateContext: AppContextInterface | null = React.useContext(ContextApp);

  const ModalRender: any = React.useMemo(() => {
    return handleGetCurrentModal(currentModal);
  }, [currentModal]);
  console.log(ModalRender);
  if (!ModalRender) return <></>;

  return (
    <Modal
      open={true}
      footer={null}
      width={900}
      onCancel={() => {
        setCurrentModal("");
      }}
      centered={true}
    >
      <ModalRender />
    </Modal>
  );
}
