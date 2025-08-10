const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({ message: 'Token requerido' });
        console.log(authHeader)
    }

    const token = authHeader.split(' ')[1];
    console.log(token)

    try {
        const decodedToken = jwt.verify(token, 'secreto1234'); /*la clave secreta la asigno en auth.controller.js*/
        req.userId = decodedToken.id;
        req.userRol = decodedToken.rol;
        next(); /*si puedo decodificar el token, paso al siguiente middleware*/
    } catch (error) {
        return res.status(401).json({ message: 'Token de autenticación inválido o expirado' });
    }
}

module.exports = verifyToken 