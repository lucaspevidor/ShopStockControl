import { NextFunction, Request, Response } from "express";
import prisma from "../Services/db";

import { CSVRequestType } from "../middlewares/CSVParserMiddleware";
import { ThrowInternalServerError } from "../Util/ServerErrorHandler";

class BulkUpdateController {
    async Validate(req: Request<unknown, unknown, CSVRequestType>, res: Response, next: NextFunction) {
        const reqItems = req.body;
        if (!reqItems.items) {
            return res.status(500).json({ error: "Nenhum item válido" });
        }

        const validItems = reqItems.items.filter(item => item.code > 0);        
        const validCodes = validItems.map(item => item.code);        
        
        try {
            // Validar se todos os itens estão presentes no banco de dados
            const products = await prisma.products.findMany({
                where: { code: { in: validCodes } },
                include: { product_idToproducts: true }
            });            
            const packs = await prisma.packs.findMany({
                where: { pack_id: { in: validCodes } } ,                    
            });

            reqItems.items.forEach(item => {
                if (item.code > 0) {
                    item.product = products.find(product => Number(product.code) === item.code);
                    item.packs = packs.filter(pack => Number(pack.pack_id) === item.code);

                    if (!item.product) { item.errors.push(`Produto ${item.code} não cadastrado`); }
                    if (item.packs.length == 0 && item.product) item.type = "Product";
                    if (item.packs.length > 0) item.type = "Pack";
                }
            });                

            reqItems.items.forEach(item => {
                // Validações de preço
                if (item.product && item.new_price < Number(item.product.cost_price)) {
                    item.errors.push("Preço de venda está menor que o preço de custo");
                }
                if (item.product &&
                    Math.abs(item.new_price - Number(item.product.sales_price)) > 0.1 * Number(item.product.sales_price)) {
                    item.errors.push("Novo preço de venda é diferente em mais que 10% comparado ao anterior");
                }

                // Validações de pacotes
                // Para os produtos que pertencem a pacotes, a atualização de preço do pacote deve estar no CSV
                if (
                    item.type === "Product" &&
                    item.product?.product_idToproducts &&
                    item.product.product_idToproducts.length > 0
                ) {
                    item.product.product_idToproducts.forEach(pack => {
                        if (!validCodes.includes(Number(pack.pack_id))) {
                            item.errors.push(`Pacote ${pack.pack_id} não incluído no CSV`);
                        }
                    });
                }
                // Todos os produtos de pacotes informados devem estar presentes no CSV
                if (
                    item.type === "Pack"
                ) {
                    let sum = 0;
                    item.packs?.forEach(product => {
                        const productInCSV = reqItems.items?.find(p => p.code === Number(product.product_id));                  
                        if (!productInCSV) {
                            item.errors.push(`Produto ${product.product_id} não incluído no CSV`);
                        } else {
                            sum += productInCSV.new_price * Number(product.qty);
                        }
                    });

                    if (Math.abs(sum - item.new_price) >= 0.001) {
                        item.errors.push("A soma dos preços de venda dos produtos neste pacote é diferente do novo valor do pacote");
                    }
                }
                
                // Bad request flag
                if (item.errors.length > 0) { req.body.badRequest = true; }
            });            

        } catch (e) {
            return ThrowInternalServerError(res, e);
        }        
    
        if (req.method === "PUT") {            
            next();
        }
        else
        {
            return res.json({ items: reqItems.items, badRequest: req.body.badRequest });
        }                    

    }

    async Update(req: Request<unknown, unknown, CSVRequestType>, res: Response) {
        const reqItems = req.body.items;

        const productsToUpdate = reqItems?.map(p => ({
            where: { code: p.code },
            data: { sales_price: p.new_price }
        }));

        if (!productsToUpdate) {
            return res.status(500).json({ error: "productsToUpdate está indefinido" });
        }

        try {
            for (const product of productsToUpdate) {
                await prisma.products.update(product);
            }
            if (productsToUpdate.length === 0) {
                return res.json({ message: "Nenhum produto foi atualizado" });
            }
            else if (productsToUpdate.length === 1) {
                return res.json({ message: "1 produto foi atualizado" });                
            }
            else {
                return res.json({ message: `${productsToUpdate.length} produtos foram atualizados` });
            }

        } catch (e) {
            return ThrowInternalServerError(res, e);
        }
    }
}

export default new BulkUpdateController();
