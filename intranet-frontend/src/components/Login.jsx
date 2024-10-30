import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalApi from '../../GlobalApi/api';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError(null);
  
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }
  
    const response = await GlobalApi.loginUser(email, password);
    console.log('API Response:', response); // Verifica la respuesta completa
  
    if (response.success) {
      const userRole = response.data ? response.data.rol : undefined; 
      if (userRole) {
        localStorage.setItem('userRole', userRole);
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
  
        if (userRole === "Basico") {
          navigate('/PanelBasico');
        } else if (userRole === "Administrador") {
          navigate('/');
        }
      } else {
        setError('El rol del usuario no está definido en la respuesta.');
      }
    } else {
      setError(response.message);
    }
  }, [email, password, navigate, setIsAuthenticated]);
  

  return (
    <section className='bg-white md:bg-gray-100 w-screen min-h-screen flex items-center justify-center lg:bg-gray-200 lg:flex-col'>
      <div className='md:bg-white rounded-lg lg:shadow-lg flex flex-col lg:w-2/3 w-4xl p-10 lg:flex-row lg:items-center'>
        <div className='hidden lg:flex lg:flex-1 lg:justify-center lg:items-center'>
          <img src="/img/login_desk.svg" alt="Imagen de escritorio" className='w-full p-20' />   
        </div>
        <div className='flex flex-col items-center lg:items-start lg:flex-1'>
          <img src="logo.svg" alt="Logo" className='w-48 mb-10 lg:hidden' />
          <img src="/img/login_phone.svg" alt="Imagen para móvil" className='w-80 mb-10 lg:hidden' />
          <form className='w-full' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-8'>
              <h1 className='hidden text-center font-bold text-3xl text-slate-700 lg:block'>Login</h1>
              <div className='flex-col flex'>
                <label htmlFor="email" className='font-bold text-xl text-slate-700'>Correo</label>
                <input 
                  type="email" 
                  id="email" 
                  className='bg-gray-200 p-2 rounded-lg mt-2' 
                  placeholder='Escribir correo...' 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='flex-col flex'>
                <label htmlFor="password" className='font-bold text-xl text-slate-700'>Contraseña</label>
                <input 
                  type="password" 
                  id="password" 
                  className='bg-gray-200 p-2 rounded-lg mt-2' 
                  placeholder='Introducir contraseña...' 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && (
                <p className='text-red-500 mt-2'>{error}</p>
              )}
            </div>
            <input 
              type="submit" 
              value="Login" 
              className='base-bgColor p-2 rounded-lg w-full mt-8 text-white text-lg cursor-pointer transition-colors duration-300 hover:bg-opacity-90' 
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;