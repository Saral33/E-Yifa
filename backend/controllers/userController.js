import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'



const authUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email})

    if(user && await user.matchPassword(password)){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})
const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body;

    
    const userExist = await User.findOne({email})
    if(userExist){
       res.status(400)
        throw new Error('User with this email already registered')
    }
    else{
    const user = await User.create({name,email,password})
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid data')
    }
    }
    
})

const getUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }
    else{
        res.status(404)
        throw new Error('No user found')
    }
})
const updateUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
    const {name,email,password} = req.body;
    if(user){
        user.name = name || user.name
        user.email = email || user.email
        if(password){
            user.password = password
        }

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    }
    else{
        res.status(404)
        throw new Error('No user found')
    }
})

const updateUserByAdmin = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
   
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin
      

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }
    else{
        res.status(404)
        throw new Error('No user found')
    }
})

const getUsers = asyncHandler(async(req,res)=>{
    const users = await User.find({})
    res.json(users)
})


const getUserByID = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)

    if(user){
    res.json(user)
    }else{
        res.status(404)
        throw new Error('No user found')
    }
})

const deleteUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)

    if(user){
        await user.remove()
        res.json({message:'User removed'})
    }
    else{
        res.status(404)
        throw new Error('No user found')
    }
})



export {authUser,getUserProfile, registerUser, updateUserProfile,getUsers,deleteUser,getUserByID,updateUserByAdmin}