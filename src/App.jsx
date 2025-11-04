import { useEffect, useRef, useState, useCallback } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

// Recuperamos los IDs guardados en localStorage y los parseamos a un array
const idsArray = JSON.parse(localStorage.getItem("selectedIds")) || [];

// Convertimos los IDs almacenados en localStorage a objetos de lugares disponibles
const selectedPlaceLocalStorge = idsArray
  .map((id) => AVAILABLE_PLACES.find((place) => place.id === id))
  .filter((place) => place !== undefined); // Eliminamos cualquier valor undefined en caso de que algún ID no exista en AVAILABLE_PLACES

console.log(selectedPlaceLocalStorge); // Mostramos en consola los lugares recuperados de localStorage

function App() {
  const modal = useRef(); // Referencia al modal para poder abrirlo y cerrarlo programáticamente
  const selectedPlace = useRef(); // Referencia para almacenar temporalmente el ID del lugar a eliminar

  // Estado para almacenar los lugares seleccionados, inicializando con los lugares recuperados de localStorage
  const [pickedPlaces, setPickedPlaces] = useState(selectedPlaceLocalStorge);

  // Estado para almacenar los lugares ordenados por distancia
  const [sortedAvailablePlaces, setSortedAvailablePlaces] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("estoy dentro del App"); // Mensaje de depuración para verificar que el componente se renderiza

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );

      // Filtramos los que NO están ya seleccionados
      const filteredPlaces = sortedPlaces.filter(
        (place) => !pickedPlaces.some((picked) => picked.id === place.id)
      );

      setSortedAvailablePlaces(filteredPlaces);
    });
  }, [pickedPlaces]); // Añadimos pickedPlaces como dependencia para que se actualice al cambiar

  // Función para abrir el modal de confirmación antes de eliminar un lugar
  function handleStartRemovePlace(id) {
    setIsModalOpen(true);

    selectedPlace.current = id; // Almacena el ID del lugar a eliminar
  }

  // Función para cerrar el modal sin eliminar el lugar
  function handleStopRemovePlace() {
    setIsModalOpen(false);
  }

  // Función para añadir un lugar a la lista de seleccionados
  const handleAddPlace = useCallback(function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      // Si el lugar ya está en la lista, no lo agregamos nuevamente
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      // Buscamos el lugar en la lista de disponibles
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces]; // Agregamos el nuevo lugar al inicio del array
    });

    // Recuperamos los IDs previos guardados en localStorage
    const selectedIds = JSON.parse(localStorage.getItem("selectedIds")) || [];

    // Agregamos el nuevo ID si no está en la lista
    if (!selectedIds.includes(id)) {
      selectedIds.push(id);
    }

    // Guardamos el array actualizado en localStorage
    localStorage.setItem("selectedIds", JSON.stringify(selectedIds));

    console.log(selectedIds); // Verificamos en consola que los IDs se actualizan correctamente
  }, []);

  // Función para eliminar un lugar de la lista de seleccionados
  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) => {
      const updatedPlaces = prevPickedPlaces.filter(
        (place) => place.id !== selectedPlace.current
      );

      // Actualizamos también localStorage
      const storedIds = JSON.parse(localStorage.getItem("selectedIds")) || [];
      const updatedIds = storedIds.filter((id) => id !== selectedPlace.current);
      localStorage.setItem("selectedIds", JSON.stringify(updatedIds));

      return updatedPlaces;
    });

    setIsModalOpen(false);
  }

  return (
    <>
      {/* Modal para confirmar eliminación de un lugar */}
      <Modal isOpen={isModalOpen}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>

      <main>
        {/* Lista de lugares seleccionados */}
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces} // Lugares seleccionados
          onSelectPlace={handleStartRemovePlace} // Permite eliminar un lugar
        />

        {/* Lista de lugares disponibles, ordenados por distancia */}
        {sortedAvailablePlaces.length > 0 ? (
          <Places
            title="Available Places"
            places={sortedAvailablePlaces} // Lugares ordenados por distancia
            onSelectPlace={handleAddPlace} // Permite seleccionar un lugar
          />
        ) : (
          <p>Sorting Places...</p> // Muestra un mensaje mientras se ordenan los lugares
        )}
      </main>
    </>
  );
}

export default App;
