import React, { useState, useEffect } from 'react';
import GlobalApi from '../../GlobalApi/api';

const EditUserForm = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    tel: '',
    puesto_id: '',
    departamento_id: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre,
        email: user.email,
        tel: user.tel,
        puesto_id: user.puesto_id,
        departamento_id: user.departamento_id,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      const response = await GlobalApi.editUser({
        id: user.id, 
        ...formData,
      });

      if (response.success) {
        onClose(); // Cierra el formulario al editar exitosamente
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error('Error al editar el usuario:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Editar Usuario</h2>
      <div className="mb-4">
        <label className="block text-sm font-semibold">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 w-full rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 w-full rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold">Teléfono</label>
        <input
          type="tel"
          name="tel"
          value={formData.tel}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 w-full rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold">Puesto ID</label>
        <input
          type="number"
          name="puesto_id"
          value={formData.puesto_id}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 w-full rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold">Departamento ID</label>
        <input
          type="number"
          name="departamento_id"
          value={formData.departamento_id}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 w-full rounded"
        />
      </div>
      
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Guardar Cambios
      </button>
      <button type="button" onClick={onClose} className="ml-2 p-2 border border-gray-300 rounded">
        Cancelar
      </button>
    </form>
  );
};

export default EditUserForm;
