import { db } from "../lib/db";

export const getUserByEmail = async(correo: string) =>{
    if(!correo) return null;

    try {
        const user = await db.usuario.findUnique({
            where: {
                correo,
            },
        });

        return user;

    } catch (error) {
        console.log(error);
        return null;
    }
};