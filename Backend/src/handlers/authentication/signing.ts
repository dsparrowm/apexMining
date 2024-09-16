import { z } from "zod";
import prisma from "../../db";
import comparePassword from "../../helpers/comparePassword";
import createJWT from "../../helpers/createJwt";
import { Request, Response } from 'express'

const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        let user = await prisma.user.findUnique({
            where: {
                email,
            },
            include: {
               deposits: true,
               withdrawals: true,
            }
        })
        if (!user) {
            res.status(404)
            return res.json({message: "No user found", isSuccess: false})
        }
        const isValidPassword = await comparePassword(password, user.password);
        if (!isValidPassword) {
            res.status(401)
            return res.json({message: "Invalid password", issuccess: false})
        }
        delete user.password;

        const token = createJWT(user)
        res.json({
            message: "Login successful",
            token,
            user,
            isSuccess: true,
        });
    } catch (err) {
        if (err instanceof z.ZodError) {
            res.status(400)
            return res.json({message: err.issues, isSuccess: false})
        }
        res.status(500)
        res.json({message: err.message, isSuccess: false})
    }
    
}

export default signin;