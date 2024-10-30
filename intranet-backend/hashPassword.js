const bcrypt = require('bcryptjs');

// Contraseña que deseas encriptar para el administrador inicial
const password = 'tu_contraseña_admin';

// Generar el hash de la contraseña
const saltRounds = 10; // Puedes ajustar la cantidad de rondas de sal según tus necesidades

// Usamos bcrypt.hash para generar el hash de forma asincrónica
bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error al encriptar la contraseña:', err);
    return;
  }
  console.log('Hash generado:', hash);
});
