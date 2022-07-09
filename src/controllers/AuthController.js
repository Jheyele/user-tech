import { prismaClient } from "../database/PrismaClient.js"
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export default class AuthController {
    async authenticate(req, res) {
        const { email, password } = req.body;
        try {
            const userExist = await prismaClient.user.findFirst({ where: { email } });

            if (!userExist) {
                return res.status(401).json("Authentication failure");
            }

            const isValidPassword = await bcrypt.compare(password, userExist.password);

            if (!isValidPassword) {
                return res.status(401).json("Authentication failure");
            }

            const token = jwt.sign({ id: userExist.id, name: userExist.name }, process.env.SECRET_KEY_JWT, { expiresIn: '2h' });

            const user = {
                "id": userExist.id,
                "name": userExist.name
            }
            return res.json({
                user,
                token,
            });
        } catch (err) {
            return res.status(400).json("Invalid data");
        }
    }
}