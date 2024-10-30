import React, { useEffect, useState, useMemo } from 'react';
import GlobalApi from '../../GlobalApi/api';
import UserModal from './UserModal'; 
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const PanelAdmin = () => {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  const getUsers = async () => {
    const response = await GlobalApi.fetchUsers();
    if (response.success) {
      setUsers(response.users);
    } else {
      setError(response.message);
    }
  };

  const getDepartments = async () => {
    const response = await GlobalApi.fetchDepartments();
    if (response.success) {
      setDepartments(response.departments);
    } else {
      setError(response.message);
    }
  };

  useEffect(() => {
    getUsers();
    getDepartments();
  }, []);

  // useMemo utilizado para memorizar el nombre del departamento
  const departmentNames = useMemo(() => {
    const names = {};
    departments.forEach(dep => {
      names[dep.id] = dep.nombre;
    });
    return names;
  }, [departments]);

  const getDepartmentName = (id) => {
    return departmentNames[id] || 'Desconocido';
  };

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-between px-8 pt-10'>
        <h1 className='font-bold text-4xl text-slate-800'>Información empleados</h1>
        <button
          className='base-bgColor p-2 rounded-lg text-white cursor-pointer transition-colors duration-300 hover:bg-opacity-90 flex items-center gap-2'
          onClick={openModal} // Abre el modal al hacer clic
        >
          <img src="/img/add.png" alt="" className='w-14 p-2 md:w-6 sec-Bgcolor md:p-1 rounded-full' />
          <span className='hidden md:block'>Crear Usuario</span>
        </button>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-8">
        {error && <p className="text-red-500">{error}</p>}
        {users.map(user => (
          <div key={user.id} className="bg-gray-300 p-4 rounded-lg flex flex-col items-center">
            <img src={`data:image/png;base64,${user.imagen}`} alt={user.nombre} className='w-20 h-20 rounded-full mb-2 object-cover shadow-md' />
            <h2 className='font-bold text-slate-800'>{user.nombre}</h2>
            <p className='text-sm'>{getDepartmentName(user.departamento_id)}</p>
            <div className="flex w-full mt-5 justify-center gap-3">
              <span className={user.rol === "Basico" ? "bg-gray-500 text-white font-bold py-1 px-2 rounded-lg text-sm" : "sec-Bgcolor text-white font-bold py-1 px-2 rounded-lg text-sm"}>{user.rol}</span>
              <Link to={`/infoUsuariosAdmin/${user.id}`} className='base-bgColor py-1 px-2 rounded-lg text-white text-xs font-bold flex items-center'>
                Ver info.
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Modal */}
      <UserModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default PanelAdmin;
