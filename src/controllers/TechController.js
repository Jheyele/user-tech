import { prismaClient } from "../database/PrismaClient.js"

export default class TechController {
    async createTech(req, res) {
        const { name, nivel, id_user } = req.body;

        try {

            const user = await prismaClient.tech.create({
                data: {
                    name,
                    nivel,
                    id_user
                }
            })

            return res.status(201).json(user);
        } catch (err) {
            return res.status(400).json("Invalid data");
        }
    }

    async findAllTechs(req, res) {
        const techs = await prismaClient.tech.findMany();
        res.status(200).json(techs);
    }

    async updateTech(req, res) {
        const { id } = req.params;
        const { name, nivel, id_user } = req.body;

        try {
            const techExist = await prismaClient.tech.findUnique({ where: { id } });

            if (!techExist) {
                return res.status(400).json("This tech is not registered");
            }

            const user = await prismaClient.tech.update({
                where: {
                    id
                },
                data: {
                    name,
                    nivel,
                    id_user
                }
            })

            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).json("Invalid data");
        }
    }


    async findTechsByUser(req, res) {
        const { id_user } = req.params;

        const techs = await prismaClient.tech.findMany({
            where: {
                id_user
            }
        })

        return res.status(200).json(techs);
    }
}