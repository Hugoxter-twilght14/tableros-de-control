import type { NextAuthConfig } from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail } from "./src/data/user";
import bcryptjs from 'bcryptjs';
import { signInSchema } from "./src/lib/zod";

/*export default{
    /*providers: [
        Credentials({
           // async authorize(credentials){
               // const validatedFields = signInSchema.safeParse(credentials);

                /*if(!validatedFields.success){
                    return null;
                }

                if(validatedFields.success){
                    const{email, password} = validatedFields.data;
                    const user = await getUserByEmail(email);

                    //if(!user || !user.password) return null;

                    //const passwordsMatch = await bcryptjs.compare(password, user.password)
                    //if(passwordsMatch){
                        return user
                    //}
                }
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;*/