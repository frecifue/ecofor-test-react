// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Flight from './pages/Flight/Flight';
import FavoritesFlight from './pages/Flight/FavoritesFlight';
import moment from 'moment';

moment.updateLocale("language_code", {
        invalidDate: "Por Definir"
    });

function App() {
  return (
    <Routes>
      <Route path="/" element={<Flight/>} />
      <Route path="/favorite-flights" element={<FavoritesFlight/>} />
      <Route path="*" element={<div>404 - Página no encontrada</div>} />
    </Routes>
  );
}

export default App;