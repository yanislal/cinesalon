// Module : Socle — responsable : Yanis — tâche : SOC-01
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil.jsx';
import Salon from './pages/Salon.jsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('racine')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/room/:code" element={<Salon />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
