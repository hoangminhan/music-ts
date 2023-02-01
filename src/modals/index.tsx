import * as React from "react";
import { nameModal } from "const";
import { ModalLayout } from "layout";
import { ContextApp } from "context";
import { Modal } from "antd";
import { ModalAuth } from "auth";
import { ModalWathcMv } from "component";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface ModalAppProps {
  children?: React.ReactElement;
}

const handleGetCurrentModal = (type: string) => {
  switch (type) {
    case nameModal.MODAL_LAYOUT:
      return ModalLayout;
    case nameModal.MODAL_AUTH:
      return ModalAuth;
    case nameModal.MODAL_MV:
      return ModalWathcMv;
    default:
      return null;
  }
};

export default function ModalApp(props: ModalAppProps) {
  const {
    themeProject,
    currentModal,
    setCurrentModal,
    setPropsModal,
    propsModal,
    dataModal,
    setDataModal,
  } = React.useContext(ContextApp);

  const ModalRender: any = React.useMemo(() => {
    return handleGetCurrentModal(currentModal);
  }, [currentModal]);
  if (!ModalRender) return <></>;

  return (
    <Modal
      open={true}
      footer={null}
      width={900}
      // closeIcon={
      //   <div className="w-10 h-10 mr-2 rounded-full flex items-center justify-center bg-hoverBgItem">
      //     <FontAwesomeIcon icon={faClose} />
      //   </div>
      // }
      onCancel={() => {
        setCurrentModal("");
        setPropsModal({});
        setDataModal({});
        const htmlElement = document.getElementsByTagName("html");
        htmlElement[0].setAttribute("data-theme", themeProject);
      }}
      centered={true}
      {...propsModal}
    >
      <ModalRender dataModal={dataModal} />
    </Modal>
  );
}
