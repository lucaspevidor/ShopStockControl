import { Prisma } from "@prisma/client";
import { Response } from "express";

export function ThrowInternalServerError(res: Response, e:unknown = undefined): Response {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(500).json({ error: "Erro intero do servidor", message: e.message });
    } else {
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
}
