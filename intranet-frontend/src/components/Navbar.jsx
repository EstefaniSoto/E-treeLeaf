import React from 'react';
import GlobalApi from '../../GlobalApi/api';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = GlobalApi.logoutUser();
    if (response.success) {
      navigate('/login');
    }
  };

  return (
    <header className='px-8 py-3 bg-white'>
      <nav className='flex justify-between'>
        <img src="/logo.svg" alt="Logo" className='w-44' />
        <div className="flex items-center gap-3">
          <button 
            className='base-bgColor p-2 rounded-lg text-white text-lg cursor-pointer transition-colors duration-300 hover:bg-opacity-90'
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
