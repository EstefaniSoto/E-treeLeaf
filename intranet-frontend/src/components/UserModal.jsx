import React, { useState, useEffect } from 'react';
import GlobalApi from '../../GlobalApi/api';

const UserModal = ({ isOpen, onClose }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [puestoId, setPuestoId] = useState('');
  const [rol, setRol] = useState('');
  const [departamentoId, setDepartamentoId] = useState('');
  const [jefeDirectoId, setJefeDirectoId] = useState('');
  const [subordinadoId, setSubordinadoId] = useState('');
  const [imagen, setImagen] = useState(null);
  const [password, setPassword] = useState('');
  const [errorTel, setErrorTel] = useState(''); // Estado para manejar errores

  const [puestos, setPuestos] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const puestosResponse = await GlobalApi.fetchPositions();
        const departamentosResponse = await GlobalApi.fetchDepartments();
        const usuariosResponse = await GlobalApi.fetchUsers();

        if (Array.isArray(puestosResponse.positions)) {
          setPuestos(puestosResponse.positions);
        } else {
          console.error('La respuesta de puestos no es un array', puestosResponse);
          setPuestos([]);
        }

        setDepartamentos(departamentosResponse.departments || []);
        setUsuarios(usuariosResponse.users || []);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  // Función para reiniciar todos los campos del formulario
  const resetForm = () => {
    setNombre('');
    setEmail('');
    setTel('');
    setPuestoId('');
    setRol('');
    setDepartamentoId('');
    setJefeDirectoId('');
    setSubordinadoId('');
    setImagen(null);
    setPassword('');
    setErrorTel(''); // Reinicia el error de teléfono
  };

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleTelChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setTel(value);
      setErrorTel(''); // Resetea el error si el input es válido
    } else {
      setErrorTel('El número de teléfono no puede tener más de 10 dígitos');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valida que no haya errores antes de enviar el formulario
    if (errorTel) {
      console.error('Error de validación:', errorTel);
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('email', email);
    formData.append('tel', tel);
    formData.append('puesto_id', puestoId);
    formData.append('rol', rol);
    formData.append('departamento_id', departamentoId);
    formData.append('jefe_directo_id', jefeDirectoId);
    formData.append('subordinado_id', subordinadoId);
    formData.append('imagen', imagen);
    formData.append('password', password);

    try {
      const response = await GlobalApi.createUser(formData);
      if (response.success) {
        console.log('Usuario creado:', response.data);
        onClose(); // Cierra el modal y resetea el formulario
        resetForm(); // Resetea el formulario
        window.location.reload(); // Recarga la página
      } else {
        console.error('Error al crear usuario:', response.message);
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 md:w-1/2">
        <h2 className="font-bold text-4xl text-center mb-10">Crear Usuario</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
            required
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
            required
          />
          <input
            type="tel"
            placeholder="Teléfono"
            value={tel}
            onChange={handleTelChange} // Cambia aquí
            className={`border rounded p-2 mb-4 w-full ${errorTel ? 'border-red-500' : ''}`} // Agrega clase si hay error
          />
          {errorTel && <p className="text-red-500 text-sm mb-4">{errorTel}</p>} {/* Mensaje de error */}

          <select
            value={puestoId}
            onChange={(e) => setPuestoId(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
            required
          >
            <option value="">Seleccione un Puesto</option>
            {puestos.map((puesto) => (
              <option key={puesto.id} value={puesto.id}>
                {puesto.nombre}
              </option>
            ))}
          </select>

          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
            required
          >
            <option value="">Seleccione un Rol</option>
            <option value="Basico">Básico</option>
            <option value="Administrador">Administrador</option>
          </select>

          <select
            value={departamentoId}
            onChange={(e) => setDepartamentoId(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
            required
          >
            <option value="">Seleccione un Departamento</option>
            {departamentos.map((departamento) => (
              <option key={departamento.id} value={departamento.id}>
                {departamento.nombre}
              </option>
            ))}
          </select>

          <select
            value={jefeDirectoId}
            onChange={(e) => setJefeDirectoId(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
          >
            <option value="">Seleccione un Jefe Directo</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nombre}
              </option>
            ))}
          </select>

          <select
            value={subordinadoId}
            onChange={(e) => setSubordinadoId(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
          >
            <option value="">Seleccione un Subordinado</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nombre}
              </option>
            ))}
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border rounded p-2 mb-4 w-full"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2 mb-4 w-full"
            required
          />
          <div className="flex justify-end">
          <button
          type="button"
          onClick={() => {
            resetForm(); // Reinicia el formulario al cerrar
            onClose();
            window.location.reload(); // Recarga la página
          }}
          className="base-bgColor p-2 rounded-lg text-white"
        >
          Cerrar
  </button>

            <button
              type="submit"
              className="ml-2 base-bgColor p-2 rounded-lg text-white"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
