import jwt from 'jsonwebtoken';

const { PUBLIC_KEY } = process.env


export const autenticacionMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];;
    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    try {
        const decodedToken = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] });
        req.usuario = decodedToken;
        next();
    } catch (error) {
        console.error('Error al verificar el token', error);
        return res.status(401).json({ mensaje: 'Token inválido' });
    }
};