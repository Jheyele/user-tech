import { prismaClient } from "../database/PrismaClient.js"
import bcrypt from "bcryptjs";

export default class UserController {
    async createUser(req, res) {
        const { name, email, pass } = req.body;

        try {
            const checkEmailExist = await prismaClient.user.findFirst({ where: { email } });

            if (email && checkEmailExist) {
                // conflit
                return res.status(409).json("Email already registered");
            }

            const password = await bcrypt.hash(pass, 8);

            const user = await prismaClient.user.create({
                data: {
                    name,
                    email,
                    password
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            })

            return res.status(201).json(user);
        } catch (err) {
            return res.status(400).json("Invalid data");
        }
    }

    async findAll(req, res) {
        const users = await prismaClient.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            }
        })
        return res.status(200).json(users);
    }

    async findUserById(req, res) {
        const { id } = req.params;
        const user = await prismaClient.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })
        return res.status(200).json(user);
    }

    async updateUser(req, res) {
        const { id } = req.params;
        const { name, email, password } = req.body;

        try {
            const userExist = await prismaClient.user.findUnique({ where: { id } });

            if (!userExist) {
                return res.status(400).json("This user is not registered");
            }

            const user = await prismaClient.user.update({
                where: {
                    id
                },
                data: {
                    name,
                    email,
                    password
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            });

            return res.status(200).json(user);

        } catch (err) {

            return res.status(400).json("Invalid data");

        }

    }

    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const userExist = await prismaClient.user.findUnique({ where: { id } });

            if (!userExist) {
                return res.status(400).json("This user is not registered");
            }

            const user = await prismaClient.user.delete({ where: { id } });
            return res.status(202).json("User deleted");
        } catch (err) {

            return res.status(400).json("Invalid data");

        }

    }

}