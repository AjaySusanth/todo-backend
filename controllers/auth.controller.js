import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import bcrypt from 'bcryptjs'

export const signin = async(req,res) => {
    const {name,email,password} = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({
            message:"All credentials are required",
            success:false
        })
    }
    try{

        const existingUser = await User.findOne({email})
        if(existingUser) {
            return res.status(400).json({
                message:"User exist with this email, Please login",
                success:false
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({
            name,
            email,
            password:hashedPassword
        })

        await user.save();
        generateTokenAndSetCookie(res,user._id)

        res.status(201).json({
            message:"Signed in successfully",
            success:true,
            user:{
                ...user._doc,
                password:undefined
            }
        })
    } catch(error) {
        console.log("Error in sign in", error)
        res.status(500).json({
            message:`Sign in failed: ${error.message}`,
            success:false
        })
    }
}

export const login = async(req,res) => {
    const {email,password} = req.body;
    if(!email || !password) {
        return res.status(400).json({
            message:"All credentials are required",
            success:false
        })
    }
    try{
        const user  = await User.findOne({email})
        if(!user) {
            return res.status(401).json({
                message:"Invalid credentials, please try again",
                success:false
            })
        }

        const isValidPassword = await bcrypt.compare(password,user.password)

        if(!isValidPassword) {
            return res.status(401).json({
                message:"Invalid credentials, please try again",
                success:false
            })
        }

        generateTokenAndSetCookie(res,user._id)

        res.status(200).json({
            messsage:"Logged in successfully",
            success:true,
            user:{
                ...user._doc,
                password:undefined
            }
        })
    } catch (error) {
        console.log("Error in login", error)
        res.status(500).json({
            message:`Login failed: ${error.message}`,
            success:false
        })
    }
}