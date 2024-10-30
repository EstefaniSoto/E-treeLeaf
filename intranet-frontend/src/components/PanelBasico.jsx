import React, { useEffect, useState } from 'react';
import GlobalApi from '../../GlobalApi/api';
import Navbar from './Navbar';

const PanelBasico = () => {
  const [user, setUser] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  const fetchUser = async () => {
    const userId = localStorage.getItem('userID');
    const response = await GlobalApi.fetchUserById(userId);
    if (response.success) {
      setUser(response.user);
      setEditedUser(response.user);
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

  useEffect(() => {
    fetchUser();
    fetchDepartments();
    fetchPositions();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Cargando...</p>;

  const formatDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date);
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  };

  const currentDate = formatDate(new Date());
  const department = departments.find(dep => dep.id === user.departamento_id) || {};
  const position = positions.find(pos => pos.id === user.puesto_id) || {};

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const response = await GlobalApi.editUser(editedUser);
    if (response.success) {
      setUser(editedUser);
      setIsEditing(false);
    } else {
      setError(response.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Navbar />
      <h1 className="text-3xl md:text-4xl font-bold pt-10 pl-10">Información de perfil</h1>
      <div className="flex items-center justify-center mt-10 md:mt-20 bg-gray-100 overflow-auto">
        <div className="bg-gray-200 p-6 rounded-lg flex items-center flex-col md:flex-row md:w-3/4 lg:w-1/2">
          <div className='flex flex-col items-center md:w-1/3'>
            <img
              src={`data:image/png;base64,${user.imagen}`}
              alt={user.nombre}
              className="w-32 h-32 md:w-40 md:h-40 lg:w-72 lg:h-72 rounded-full object-cover shadow-md"
              style={{ aspectRatio: '1 / 1' }}
            />
            <p className="text-md font-bold mt-2">{position.nombre || 'No asignado'}</p>
          </div>

          <div className="flex-1 md:ml-10 mt-4 md:mt-0">
            <div className='flex justify-between items-start md:items-center'>
              <h3 className=" text-2xl md:text-3xl font-bold">Bienvenido,<span className='base-color'> {user.nombre}</span></h3>
              <div className='flex items-center md:ml-4'>
                {!isEditing ? (
                  <button
                    className='base-bgColor ml-3 p-2 rounded-lg text-white cursor-pointer transition-colors duration-300 hover:bg-opacity-90 items-center gap-2'
                    onClick={handleEditClick}
                  >
                    <img src="/img/pencil.png" alt="" className='w-6 p-1 rounded-lg' />
                  </button>
                ) : (
                  <button
                    className='base-bgColor p-2 rounded-lg text-white cursor-pointer transition-colors duration-300 hover:bg-opacity-90 items-center gap-2'
                    onClick={handleSaveClick}
                  >
                    <img src="/img/save.png" alt="" className='w-6 p-1 rounded-lg' />
                  </button>
                )}
              </div>
            </div>
            <p className="text-md mt-1 hidden md:block">{currentDate}</p>

            <div className='mt-5 flex flex-col gap-2'>
              <p>
                <strong>Nombre:</strong>
                <input
                  type="text"
                  name="nombre"
                  value={editedUser.nombre}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className={`ml-2 ${isEditing ? 'bg-white rounded-lg shadow-sm p-2' : ''}`}
                />
              </p>
              <p>
                <strong>Email:</strong>
                <input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className={`ml-2 ${isEditing ? 'bg-white rounded-lg shadow-sm p-2' : ''}`}
                />
              </p>
              <p>
                <strong>Teléfono:</strong>
                <input
                  type="tel"
                  name="tel"
                  value={editedUser.tel}
                  disabled={!isEditing}
                  onChange={handleInputChange}
                  className={`ml-2 ${isEditing ? 'bg-white rounded-lg shadow-sm p-2' : ''}`}
                />
              </p>
              <p><strong>Departamento:</strong> {department.nombre || 'No asignado'}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PanelBasico;
