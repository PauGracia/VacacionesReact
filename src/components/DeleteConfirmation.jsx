import { useState } from "react";
import ProgressBar from "./ProgressBar.jsx";

// Tiempo que tarda la barra de progreso en completarse automáticamente (3 segundos)
const TIMER = 3000;

// Componente que muestra un mensaje de confirmación con un temporizador visual (barra de progreso)
// Si el usuario no responde en 3 segundos, se confirma automáticamente la eliminación
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  const [isCanceled, setIsCanceled] = useState(false); // Estado para indicar si se canceló la operación

  // Función que se ejecuta si el usuario hace clic en "No"
  function handleCancel() {
    setIsCanceled(true); // Detiene la barra de progreso
    onCancel(); // Cierra el modal sin eliminar nada
  }

  // Función que se ejecuta si el usuario hace clic en "Yes" o si el tiempo se agota
  function handleConfirm() {
    setIsCanceled(true); // Detiene la barra de progreso si aún está activa
    onConfirm(); // Confirma la eliminación del lugar
  }

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>

      {/* Botones de acción para el usuario */}
      <div id="confirmation-actions">
        <button onClick={handleCancel} className="button-text">
          No
        </button>
        <button onClick={handleConfirm} className="button">
          Yes
        </button>
      </div>

      {/* Barra de progreso que se llena en TIMER ms (3s).
          Si no se cancela antes, ejecuta handleConfirm automáticamente */}
      <ProgressBar
        duration={TIMER} // Duración total de la barra
        onComplete={handleConfirm} // Qué hacer cuando se completa
        isCanceled={isCanceled} // Si es true, detiene la barra
      />
    </div>
  );
}
