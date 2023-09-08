import { Request, Response, NextFunction } from "express";
import type { packs } from "@prisma/client";
import { Prisma } from "@prisma/client";

const productsWithPacks = Prisma.validator<Prisma.productsDefaultArgs>()({ include: { product_idToproducts: true } });
type ProductWithPacks = Prisma.productsGetPayload<typeof productsWithPacks>;

export interface UpdateItem {
    type: string;
    code: number;
    new_price: number;
	errors: string[];
	product: ProductWithPacks | undefined;
	packs: packs[] | undefined;
}

export interface CSVRequestType {
    rawContent?: string;
    rows?: string[][];
	items?: UpdateItem[];
    badRequest: boolean;
}

export function CSVParseToRows(req: Request<unknown, unknown, CSVRequestType>, res: Response, next: NextFunction) {
    req.body.rows = [];
    req.body.items = [];
    req.body.badRequest = false;

    const rawCSV = req.body.rawContent;
    if (!rawCSV) {
        req.body.badRequest = true;
        return res.status(500).json({ error: "rawCSV está indefinido (undefined)" });
    }

    const rows = rawCSV.split("\n");
    const rowCols: string[][] = [];

    if (rows.length < 2) {
        return res.status(400).json({ error: "Conteúdo do arquivo CSV inválido" });
    }

    for (let i = 0; i < rows.length; i++) {
        const splittedRow = rows[i].split(",");
        if (splittedRow.length < 2) {
            req.body.badRequest = true;
            return res.status(400).json({ error: `CSV inválido. Erro na linha ${i + 1}` });
        }
        rowCols.push(splittedRow);
    }    
    
    rowCols.splice(0, 1);

    req.body.rows = rowCols;

    next();
}

export function CSVRowsToBulkUpdateItem(req: Request<unknown, unknown, CSVRequestType>, res: Response, next: NextFunction) {
    const { rows } = req.body;
    if (!rows) {        
        return res.status(500).json({ error: "rows está indefinido (undefined)" });
    }

    req.body.items = [];

    rows.forEach(row => {
        const blkItem: UpdateItem = {
            type: "undefined",
            code: -1,
            new_price: -1,
            errors: [],
            product: undefined,
            packs: undefined,
        };
		
        if (Number.isNaN(Number(row[0]))) { blkItem.errors.push("Código inválido (não numérico)"); }
        else if (!Number.isInteger(Number(row[0]))) { blkItem.errors.push("Código inválido (não inteiro)"); }
        else if (Number(row[0]) < 0) { blkItem.errors.push("Código inválido (menor que zero)");}
        else {
            blkItem.code = Number(row[0]);
        }

        if (Number.isNaN(Number(row[1]))) { blkItem.errors.push("Novo preço inválido (não numérico)"); }
        else if (Number(row[1]) < 0) { blkItem.errors.push("Novo preço inválido (menor que zero)");}
        
        if (!Number.isNaN(Number(row[1]))) {
            blkItem.new_price = Number(row[1]);
        }
		
        req.body.items?.push(blkItem);
        if (blkItem.errors.length > 0) { req.body.badRequest = true; }
    });

    next();
}
