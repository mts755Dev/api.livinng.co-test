import bcrypt from 'bcryptjs';

// Función para cifrar la contraseña
export const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    return encryptedPassword;
}

// Función para comparar una contraseña con su versión cifrada
export const comparePassword = async (password, encryptedPassword) => {
    const isMatch = await bcrypt.compare(password, encryptedPassword);
    return isMatch;
}