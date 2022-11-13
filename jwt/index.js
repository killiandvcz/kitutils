import jwt from 'jsonwebtoken';

export const createToken = (payload, key, expiresIn = '30d') => {
    return jwt.sign(payload, key, { expiresIn });
}

export const verifyToken = (token, key) => {
    return jwt.verify(token, key, {}, (err, decoded) => {
        if (err) {
            let split = [...err.name.matchAll(/([A-Z][a-z]*)/gm)].map(m => m[0].toUpperCase());
            return {
                pass: false,
                code: split.join('_'),
                message: err.message,
            };
        }
        return {
            pass: true,
            payload: decoded,
        };
    });
}

