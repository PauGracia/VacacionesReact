import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children, isOpen }) {
  const dialog = useRef();

  // Usa useEffect para abrir/cerrar el modal de manera segura
  useEffect(() => {
    if (isOpen) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [isOpen]);

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {isOpen && children}
    </dialog>,
    document.getElementById("modal") // Usa el ID "modal" para el contenedor del modal
  );
}

export default Modal;
