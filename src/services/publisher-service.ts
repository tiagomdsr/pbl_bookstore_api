import * as zod from "zod";
import { PrismaClient, Publisher } from "../generated/prisma";

import { BusinessError } from "../errors";

export const CreatePublisherSchema = zod.object({
    name: zod.string().min(3).max(32),
    address: zod.string().min(3),
    cellphone: zod.string().regex(/^\+[0-9]+$/).max(16)
});

class PublisherService {
    static async createPublisher(publisherToCreate: Omit<Publisher, "id">): Promise<Publisher> {
        const prisma = new PrismaClient();

        const existingPublisher = await prisma.publisher.findFirst({
            where: {
                OR: [
                    {
                        address: publisherToCreate.address
                    },
                    {
                        cellphone: publisherToCreate.cellphone
                    }
                ]
            } 
        });

        if(!!existingPublisher) {
            throw new BusinessError("Editora já existente");
        }

        const createdPublisher = await prisma.publisher.create({
            data: publisherToCreate
        });

        return createdPublisher;
    }
}

export default PublisherService;