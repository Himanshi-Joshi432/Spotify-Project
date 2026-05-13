const express = require('express')
const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function register(req,res){
    const {Username,email,password,role} = req.body

    const isuserexixt = await UserModel.findOne({email})
    if(isuserexixt){
        return res.status(409).json({
            message:"user already exist"
        })
    }

      const hashedpassword = await bcrypt.hash(password,10)

      const user = await  UserModel.create({
        Username,
        email,
        password:hashedpassword,
        role
      })
        const token = jwt.sign({
            id:user._id,
            role:user.role
        },process.env.JWT_SECRET,{expiresIn:"1hr"})

        res.cookie("token",token)

        res.status(201).json({
            message:"user registered successfully",
            user:{
                id:user._id,
                Username:user.Username,
                email:user.email,
                role:user.role
                
            },
            token
        })
}

async function login(req,res){
    const {email,password}=req.body
    const user = await UserModel.findOne({
        email
    })
    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }
    const ispasswordvalid = await bcrypt.compare(password,user.password)
    if(!ispasswordvalid){
        return res.status(401).json({
            message:"invalid password"
        })
    }
    const token = jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET,{expiresIn:"1hr"})
    res.cookie("token",token)
    res.status(200).json({
        message:"user logged in successfully",
        user:{
            id:user._id,
            Username:user.Username,
            email:user.email,
            role:user.role
        },
        token
    })

}

async function logout(req,res){
    const {email,password} = req.body

    const user=await UserModel.findOne({
        email
    })
    if(!user){
        res.status(404).json({
            message:"user not found"
        })
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        res.status(401).json({
            message:"invalid password"
        })
    }
    res.clearCookie("token")
    res.status(200).json({
        message:"user logged out successfully"
    })
}

module.exports={register,login,logout}