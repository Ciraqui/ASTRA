const jwt = require('jsonwebtoken');

const blackList = [];

const blackListToken = (token) => {
    blackList.push(token);
}

const generateToken = (id, role) => {
    if (!process.env.SECRET_JWT) {
        throw new Error('Variável de ambiente SECRET_JWT não está definida');
    }
    return jwt.sign({ id, role }, process.env.SECRET_JWT, { expiresIn: '1H' });
}

const verifyToken = (token) => {
    if (blackList.includes(token)) {
        throw new Error('Token inválido!');
    }

    if (!process.env.SECRET_JWT) {
        throw new Error('Variável de ambiente SECRET_JWT não está definida');
    }

    return jwt.verify(token, process.env.SECRET_JWT);
};

module.exports = { generateToken, verifyToken, blackListToken };