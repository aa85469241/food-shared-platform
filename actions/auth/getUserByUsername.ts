import prisma from "@/lib/prisma"

export const getUserByUsername = async (username: string) => {
    try {
        const profile = await prisma.profile.findUnique({
            where: {
                name: username
            }
        })

        return profile
    }
    catch (err) {
        return null;
    }
}