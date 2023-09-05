import prisma from "../Services/db";
import { Request, Response } from "express";
import { ThrowInternalServerError } from "../Util/ServerErrorHandler";

interface PackReadRequest {
	id?: string;
}

class PackController {
    async Read(req: Request<PackReadRequest>, res: Response) {
        const { id } = req.params;				

        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ error: "ID de pack inválido" });
        }
        
        try {
            const pack = await prisma.packs.findFirst({
                where: {
                    pack_id: Number(id)
                }
            });

            if (!pack) {
                return res.status(404).json({ error: "Pack não encontrado" });
            }

            return res.json(pack);

        } catch (e) {
            return ThrowInternalServerError(res, e);
        }
    }
}

export default new PackController();
