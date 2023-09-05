import prisma from "../Services/db";
import { Request, Response } from "express";
import { ThrowInternalServerError } from "../Util/ServerErrorHandler";

interface ProductReadRequest {
	code?: string;
}

class ProductController {
    async Read(req: Request<ProductReadRequest>, res: Response) {
        const { code } = req.params;				

        if (!Number.isInteger(Number(code))) {
            return res.status(400).json({ error: "Código de produto inválido" });
        }
        
        try {
            const product = await prisma.products.findFirst({
                where: {
                    code: Number(code)
                }
            });

            if (!product) {
                return res.status(404).json({ error: "Produto não encontrado" });
            }

            return res.json(product);

        } catch (e) {
            console.log(e);		
            return ThrowInternalServerError(res, e);
        }
    }
}

export default new ProductController();
