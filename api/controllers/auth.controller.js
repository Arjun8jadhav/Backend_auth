import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        console.log("request reached");
        const { username, email, pass } = req.body;
        console.log(req.body);
        const hashpass = await bcrypt.hash(req.body.pass, 10);
        const user = await prisma.user.findUnique({
            where: { username }
        })
        if (user) {
            return res.status(401).json({ message: "Invalid credential!" });
        }
        const newUser = await prisma.user.create({
            data: {
                username: username,
                email,
                password: hashpass,

            }
        })
        console.log(newUser);
        res.status(202).json({ message: "user created" })
    }
    catch (err) {
        res.status(500).json({ message: err })
    }

}
export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        //check user exist
        const user = await prisma.user.findUnique({
            where: { username }
        })
        if (!user) {
            return res.status(400).json({ message: "Invalid credential!" });
        }
        //password is correct?
        const isvalid = await bcrypt.compare(password, user.password);
        if (!isvalid) {
            return res.status(400).json({ message: "Invalid credential!" });
        }
        //cookies
        const age = 1000 * 60 * 60 * 24 * 7;
        const token = jwt.sign({
            id: user.id,
            isAdmin: false,
        }, "arjunjadhav733",
            { expiresIn: age })
        const {password : userPassword,...userInfo}=user;
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: age,
        }).status(200).json(userInfo)

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "failed to login" })
    }
}
export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({message: "Logout succesfully"})
}