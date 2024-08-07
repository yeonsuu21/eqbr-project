import { useAtom } from "jotai";
import React from "react";
import Modal from "react-modal";
import { setmodalAtom } from "stores/modal";
import styled from "styled-components";
import ModalFav from "./ModalFav";

// Ensure Modal.setAppElement is called at the root of your app
Modal.setAppElement("#root");

function ModalBox() {
  const [modalOpen, setModalOpen] = useAtom(setmodalAtom);

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      ariaHideApp={false}
      style={customModalStyles}
      contentLabel="Pop up Message"
      shouldCloseOnOverlayClick={true}
    >
      <ModalFav />
    </Modal>
  );
}

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "1000",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "540px",
    height: "350px",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    justifyContent: "center",
    overflow: "auto",
  },
};

export default ModalBox;
