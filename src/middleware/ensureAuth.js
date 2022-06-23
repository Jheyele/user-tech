import jwt from 'jsonwebtoken';

export default function (req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json("Token missing!");
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const { id } = jwt.verify(token, process.env.SECRET_KEY_JWT);
        req.userId = id;

        return next();

    } catch {
        return res.status(401).json("Invalid Token");
    }
}