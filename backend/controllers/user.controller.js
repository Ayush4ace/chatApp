// register 
import {User} from '../models/user.models.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const register = async(req, res)=>{
    try {
        const{fullName, userName, gender, password, confirmPassword} = req.body;
        if(!fullName || !userName || !gender || !password || !confirmPassword){
            return res.status(400).json({
                message: "somefield is missing",
                success: false
            });
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                message: "password do not match",
                success: false
            });
        }

        // check if the user already exists or not 
        const user = await User.findOne({userName});
        if(user){
            return res.status(400).json({
                message: "user already exists with this username",
                success: false
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${userName}`
        await User.create({
            fullName,
            userName,
            password: hashPassword,
            profilePhoto: gender==="male"? maleProfilePhoto: femaleProfilePhoto,
            gender
        });

        return res.status(201).json({
            message: "user registered succesfully",
            success: true,
            
        })

    } catch (error) {
        console.log(error);
    }
}

// login 

export const login = async(req, res)=>{
    try {
        const{userName, password} = req.body;
        if(!userName || !password){
            return res.status(404).json({
                message: "all fields are required",
                success: false
            });
        }

        const user = await User.findOne({userName});
        if(!user){
            return res.status(404).json({
                message: "user not found",
                success: false
            });
        }

        // check password match
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message: "password do not match",
                success: false
            });
        }

        const tokenData = {
            userId: user._id

        };

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});

        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpOnly: true, sameSite: "strict"}).json({
            message: "user logged in successfully",
            _id: user._id,
            userName: user.userName,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto,
            success: true
        });


    } catch (error) {
        console.log(error);
    }
}



// logout 

export const logout = async(req, res)=>{
    try {
        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            message: "user logged out successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}