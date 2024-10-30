import React, { useEffect, useState, useRef } from 'react';
import GlobalApi from '../../GlobalApi/api';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

const InfoUsersAdmin = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [user, setUser] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState(null);

  const imgRef = useRef(null); 

  const fetchUser = async () => {
    const response = await GlobalApi.fetchUserById(id);
    if (response.success) {
      setUser(response.user);
    } else {
      setError(response.message);
    }
  };

  const fetchDepartments = async () => {
    const response = await GlobalApi.fetchDepartments();
    if (response.success) {
      setDepartments(response.departments);
    } else {
      setError(response.message);
    }
  };

  const fetchPositions = async () => {
    const response = await GlobalApi.fetchPositions();
    if (response.success) {
      setPositions(response.positions);
    } else {
      setError(response.message);
    }
  };

  const fetchAllUsers = async () => {
    const response = await GlobalApi.fetchUsers();
    if (response.success) {
      setAllUsers(response.users);
    } else {
      setError(response.message);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchDepartments();
    fetchPositions();
    fetchAllUsers();
  }, [id]);

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.focus(); // Enfocar la imagen si existe
    }
  }, [user]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Cargando...</p>;

  const formatDate = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  };

  const currentDate = formatDate(new Date());

  const jefeDirecto = allUsers.find(u => u.id === user.jefe_directo_id) || {};
  const subordinado = allUsers.find(u => u.id === user.subordinado_id) || {};
  const department = departments.find(dep => dep.id === user.departamento_id) || {};
  const position = positions.find(pos => pos.id === user.puesto_id) || {}; 

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-20 bg-gray-100 overflow-auto">
        <div className="bg-gray-200 p-6 rounded-lg flex flex-col md:flex-row md:w-3/4 lg:w-1/2">
          <div className='flex flex-col items-center md:w-1/3'>
            <img
              ref={imgRef} // Asigno la referencia aquí
              src={`data:image/png;base64,${user.imagen}`}
              alt={user.nombre}
              className="w-40 h-40 md:w-72 md:h-72 rounded-full object-cover shadow-md"
              tabIndex={0} // Permitir que la imagen reciba el enfoque
            />
            <p className="text-md font-bold mt-2">{position.nombre || 'No asignado'}</p>
          </div>
          
          <div className="flex-1 md:ml-10 mt-4 md:mt-0">
            <div className='flex justify-between items-center'>
              <h3 className="text-3xl md:text-4xl font-bold">Información del <span className='base-color'>perfil</span></h3>
              <span className={`p-2 rounded-lg text-white font-bold ${user.rol === 'Administrador' ? 'sec-Bgcolor' : 'bg-gray-500'}`}>
                {user.rol}
              </span>
            </div>
            <p className="text-md mt-1">{currentDate}</p>
            
            <div className='mt-5 flex flex-col gap-2'>
              <p><strong>Nombre:</strong> {user.nombre}</p> 
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Teléfono:</strong> {user.tel}</p>
              <p><strong>Departamento:</strong> {department.nombre || 'No asignado'}</p>
            </div>
            
            <div className="bg-gray-300 p-4 mt-4 rounded">
              <h3 className="text-2xl md:text-2xl font-bold mb-3">Estructura del <span className='base-color'>empleado</span></h3>
              <p><strong>Jefe Directo:</strong> {jefeDirecto.nombre || 'No asignado'}</p>
              <p><strong>Subordinado:</strong> {subordinado.nombre || 'No asignado'}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoUsersAdmin;
