import axios from "axios";

const axiosCreate = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Función para iniciar sesión
const loginUser = async (email, password) => {
  try {
    const response = await axiosCreate.post('/login', { email, password });

    if (response.status === 200 && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.rol);
      localStorage.setItem('userID', response.data.id);

      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Credenciales incorrectas.' };
    }
  } catch (error) {
    return { success: false, message: 'Error en el servidor.' };
  }
};

// Función para obtener los usuarios
const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosCreate.get('/usuarios', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return { success: true, users: response.data };
    } else {
      return { success: false, message: 'No se pudieron obtener los usuarios.' };
    }
  } catch (error) {
    return { success: false, message: 'Error en el servidor.' };
  }
};

// Función para obtener los departamentos
const fetchDepartments = async () => {
  try {
    const response = await axiosCreate.get('/departamentos');
    if (response.status === 200) {
      return { success: true, departments: response.data };
    } else {
      return { success: false, message: 'No se pudieron obtener los departamentos.' };
    }
  } catch (error) {
    return { success: false, message: 'Error en el servidor.' };
  }
};

// Nueva función para obtener los puestos
const fetchPositions = async () => {
  try {
    const response = await axiosCreate.get('/puestos');
    if (response.status === 200) {
      return { success: true, positions: response.data };
    } else {
      return { success: false, message: 'No se pudieron obtener los puestos.' };
    }
  } catch (error) {
    return { success: false, message: 'Error en el servidor.' };
  }
};

const createUser = async (userData) => {
  try {
    const token = localStorage.getItem('token');
    
    // Verifica el valor de subordinadoId antes de enviarlo
    console.log("Datos del usuario a crear:", userData);

    const response = await axiosCreate.post('/usuarios', userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      return { success: true, message: 'Usuario creado exitosamente.' };
    } else {
      return { success: false, message: 'No se pudo crear el usuario.' };
    }
  } catch (error) {
    console.error('Error en el servidor:', error);
    return { success: false, message: 'Error en el servidor.' };
  }
};


// Función para obtener un usuario por ID
const fetchUserById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosCreate.get(`/usuarios/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return { success: true, user: response.data };
    } else {
      return { success: false, message: 'No se pudo obtener el usuario.' };
    }
  } catch (error) {
    return { success: false, message: 'Error en el servidor.' };
  }
};

const editUser = async (userData) => {
  try {
    const token = localStorage.getItem('token');
    const userId = userData.id; 
    const { imagen, password, ...dataToUpdate } = userData; 

    const response = await axiosCreate.put(`/usuarios/${userId}`, dataToUpdate, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return { success: true, message: 'Usuario actualizado exitosamente.' };
    } else {
      return { success: false, message: 'No se pudo actualizar el usuario.' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error en el servidor.' };
  }
};


// Nueva función para cerrar sesión
const logoutUser = () => {
  localStorage.removeItem('token'); // Elimina el token
  localStorage.removeItem('userRole'); // Elimina el rol del usuario 
  localStorage.removeItem('userID'); // Elimina el id del usuario
  localStorage.removeItem('isAuthenticated');// Elimina el true de autenticado
  return { success: true, message: 'Sesión cerrada correctamente.' }; 
};

export { 
  loginUser, 
  fetchUsers, 
  fetchDepartments, 
  fetchPositions, 
  createUser, 
  editUser, 
  logoutUser, 
  fetchUserById 
}; 

export default { 
  loginUser, 
  fetchUsers, 
  fetchDepartments, 
  fetchPositions, 
  createUser, 
  editUser, 
  logoutUser, 
  fetchUserById 
}; 
