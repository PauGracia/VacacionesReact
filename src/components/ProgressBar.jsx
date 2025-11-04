import { useEffect, useState } from "react";

// Componente que muestra una barra de progreso que avanza durante un tiempo determinado (duration)
// Si la barra llega al final sin ser cancelada, llama a la función onComplete
export default function ProgressBar({ duration, onComplete, isCanceled }) {
  const [elapsedTime, setElapsedTime] = useState(0); // Tiempo transcurrido desde que empezó la barra

  useEffect(() => {
    // Si se cancela la barra desde el componente padre, reiniciamos el tiempo a 0
    if (isCanceled) {
      setElapsedTime(0); // Reiniciamos progreso visual
      return; // No arrancamos el intervalo si fue cancelado
    }

    // Creamos un intervalo que actualiza el progreso cada 10 milisegundos
    const intervalId = setInterval(() => {
      setElapsedTime((prevTime) => {
        const newTime = prevTime + 10; // Sumamos 10ms al tiempo transcurrido
        if (newTime >= duration) {
          clearInterval(intervalId); // Detenemos el intervalo al llegar al tiempo límite
          onComplete(); // Llamamos a la función pasada por props al completar la barra
        }
        return newTime; // Actualizamos el estado con el nuevo tiempo
      });
    }, 10); // Se ejecuta cada 10 milisegundos

    // Cleanup: cuando el componente se desmonta o se cambia alguna dependencia, se limpia el intervalo
    return () => clearInterval(intervalId);
  }, [duration, onComplete, isCanceled]); // Se ejecuta cuando cambia duration, onComplete o isCanceled

  // Calculamos el porcentaje completado para ajustar la anchura de la barra visual
  const percentage = Math.min((elapsedTime / duration) * 100, 100);

  // Renderizamos dos divs: uno como fondo y otro como la barra que crece con el tiempo
  return (
    <div
      style={{
        width: "100%", // Barra ocupa todo el ancho disponible
        height: "10px", // Altura de la barra
        backgroundColor: "#eee", // Fondo gris claro
        borderRadius: "5px", // Bordes redondeados
        overflow: "hidden", // Recorta cualquier desbordamiento del contenido
        marginTop: "1rem", // Margen superior para separación
      }}
    >
      <div
        style={{
          width: `${percentage}%`, // Ancho dinámico según el porcentaje de progreso
          height: "100%", // Altura completa del contenedor
          backgroundColor: "#f44336", // Color rojo (acción destructiva)
          transition: "width 0.1s linear", // Suaviza el crecimiento de la barra
        }}
      ></div>
    </div>
  );
}
