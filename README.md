
# 🗺️ PlacePicker — Tu colección personal de lugares 🌍

**PlacePicker** es una aplicación interactiva construida con **React** que te permite crear tu propia colección de lugares que te gustaría visitar (o que ya visitaste).  
Utiliza la **geolocalización del navegador** para mostrarte los lugares más cercanos, y guarda tus selecciones de forma persistente en el **almacenamiento local (localStorage)**, ¡para que no pierdas tu progreso al cerrar el navegador!

---

## 🚀 Características principales

✅ **Selección de lugares**  
Explora una lista de destinos disponibles y añade tus favoritos con un solo clic.

✅ **Ordenados por distancia**  
Gracias al uso de la API de geolocalización, los lugares se ordenan automáticamente según tu ubicación actual.

✅ **Persistencia en el navegador**  
Tus lugares seleccionados se guardan en `localStorage`, por lo que al volver a abrir la app se mantienen guardados.

✅ **Eliminación con confirmación visual**  
Al intentar borrar un lugar, aparece un modal con una barra de progreso de 3 segundos antes de confirmar la eliminación automáticamente (¡puedes cancelarla a tiempo!).

✅ **Interfaz moderna y accesible**  
Diseñada con componentes reutilizables, transiciones suaves y una experiencia intuitiva para el usuario.

---

## 🧠 Tecnologías utilizadas

| Tecnología | Descripción |
|-------------|-------------|
| **React** | Librería principal para la interfaz de usuario. |
| **JavaScript (ES6+)** | Lógica y manejo del estado del juego. |
| **HTML5 & CSS3** | Estructura y estilos básicos. |
| **localStorage API** | Persistencia de datos en el navegador. |
| **Geolocation API** | Obtiene la posición actual del usuario para ordenar los lugares. |
| **React Portals** | Renderizado del modal en un contenedor separado del DOM principal. |
| **Hooks (useState, useEffect, useRef, useCallback)** | Gestión del estado, efectos y referencias. |

---

## 🧩 Estructura de componentes

```text
src/
├── App.jsx                # Componente principal
├── data.js                # Datos de los lugares disponibles
├── loc.js                 # Funciones de geolocalización y distancia
├── assets/                # Imágenes y recursos
├── components/
│   ├── Places.jsx              # Lista de lugares (seleccionados / disponibles)
│   ├── Modal.jsx               # Componente modal reutilizable
│   ├── DeleteConfirmation.jsx # Confirmación de eliminación con temporizador
│   ├── ProgressBar.jsx         # Barra de progreso visual


---

## ⚙️ Instalación y ejecución

1. **Clona este repositorio**
   ```bash
   git clone https://github.com/tuusuario/placepicker.git
   cd placepicker
```

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**

   ```bash
   npm run dev
   ```

4. Abre tu navegador en
   👉 `http://localhost:5173/` (o el puerto indicado por Vite).

---

## 🧭 Cómo funciona

1. Al cargar la app, se solicita permiso de ubicación.
2. Se calculan las distancias desde tu posición a los lugares disponibles.
3. Puedes:

   * Añadir lugares a tu lista personal.
   * Eliminar lugares (con confirmación).
4. Todos los cambios se guardan automáticamente en `localStorage`.

---

## 💾 Persistencia de datos

* Los lugares seleccionados se guardan como un array de IDs en:

  ```js
  localStorage.setItem("selectedIds", JSON.stringify([...]));
  ```
* Al recargar la página, la app recupera esos IDs y los convierte nuevamente en objetos de lugar.

---

## 🧭 Aplicaciones y posibles usos

PlacePicker puede servir como base o inspiración para distintos tipos de aplicaciones, tanto personales como profesionales:

### 🧳 1. Planificador de viajes
Permite a los usuarios marcar los lugares que desean visitar, verlos ordenados por proximidad y conservar la lista aunque cierren la app.  
Ideal para crear un **itinerario personal de viaje**.

### 🍽️ 2. Guía de restaurantes o locales
Se puede adaptar para mostrar **restaurantes, bares o tiendas** cercanas al usuario, con la posibilidad de guardar favoritos o visitados.

### 🏞️ 3. App de rutas o puntos turísticos
Usando datos reales de geolocalización, puede mostrar puntos de interés (miradores, playas, museos, etc.) y permitir al usuario crear su propio **mapa de exploración**.

### 🏡 4. Catálogo de lugares personales
También puede funcionar como un **álbum personal**, donde el usuario guarda los sitios donde ha estado o desea ir, como una especie de diario de viajes.

### 🎯 5. Aplicación educativa o demostrativa
Excelente ejemplo para aprender sobre:
- **Geolocalización en el navegador**
- **Persistencia de datos con localStorage**
- **Renderizado condicional y modales con React**
- **Gestión de estado y efectos con hooks**

---

## 👨‍💻 Autor

Desarrollado con ❤️ por [Tu Nombre]
📍 Proyecto educativo de React con manejo de estado, geolocalización y persistencia local.

---

## 🪪 Licencia

Este proyecto se distribuye bajo la licencia **MIT**.
Puedes usarlo, modificarlo y compartirlo libremente con fines educativos o personales.

---

### ✨ *"El mundo es demasiado grande para no explorarlo."* 🌏

```


