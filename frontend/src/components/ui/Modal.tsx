import React, { ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles";

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  Content: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, toggleModal, Content }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white rounded-lg p-6 relative z-50 w-full max-w-[1300px]">
            <div className="flex justify-end mb-4">
              <button className={`${styles.redBtn} `} onClick={toggleModal}>
                <span><CloseIcon /></span> Close
              </button>
            </div>
            <div className="w-full">{Content}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
