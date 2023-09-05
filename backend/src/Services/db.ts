import { PrismaClient } from "@prisma/client";

declare global {
    export interface BigInt {
        toJSON(): string;
    }
}


BigInt.prototype.toJSON = function (): string {
	return this.toString();
};

const prisma = new PrismaClient();

process.on("exit", () => {
	prisma.$disconnect();
});

export default prisma;
