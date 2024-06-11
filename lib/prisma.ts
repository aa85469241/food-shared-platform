// import { PrismaClient } from "@prisma/client"

// declare global {
//     var prisma: PrismaClient | undefined
// }

// const prisma = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

// export default prisma;

import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma