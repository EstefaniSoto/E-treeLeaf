import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import PanelAdmin from './components/PanelAdmin';
import InfoUsersAdmin from './components/InfoUsersAdmin';
import PanelBasico from './components/PanelBasico';

function App() {
  // Lee el estado de autenticación desde localStorage al iniciar
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // Efecto para sincronizar el estado con localStorage
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route 
          path='/' 
          element={isAuthenticated ? <PanelAdmin setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} 
        />
        <Route 
          path='/PanelBasico' 
          element={isAuthenticated ? <PanelBasico /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/infoUsuariosAdmin/:id" 
          element={isAuthenticated ? <InfoUsersAdmin /> : <Navigate to="/login" />} 
        />
      </Routes>
    </>
  );
}

export default App;
