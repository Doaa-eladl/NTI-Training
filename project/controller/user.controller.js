const User=require('../db/models/user.model')
const CryptoJS = require("crypto-js");
const { ObjectId } = require('mongodb');

class UserController{
    //REGISTER
    static regestier = async (req,res) =>{
        const newuser= new User({
            username:req.body.username,
            email:req.body.email,
            password:CryptoJS.AES.encrypt(req.body.password,process.env.PassSecret).toString(),
            phone:req.body.phone,
            gender:req.body.gender,
            address:req.body.address
        })
        try{
            await newuser.save()
            res.status(200).send(newuser)
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //LOGIN
    static login = async (req,res) =>{
        try{
            const user = await User.findOne({ email:req.body.email})
            if(!user) throw new Error('user not fount or it is a mistake in mail')
            const orignpass = CryptoJS.AES.decrypt(user.password,process.env.PassSecret).toString(CryptoJS.enc.Utf8)
            if(orignpass!=req.body.password) throw new Error('wrong password')
            const token = await user.generateToken()
            //need to hide some details
            const { password , ...other } = user._doc
            res.status(200).send({ other , token })
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //UPDATE
    static update = async (req,res) =>{
        //to be able to change pass
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.PassSecret).toString()
        }
        try{
            /*
            for (item of req.body) req.user[item]= req.body[item]
            req.user.save()
            */
            const newuser = await User.findOneAndUpdate({_id:ObjectId(req.user._id)},{
                $set:req.body
            },{new:true})
            res.status(200).send(newuser)
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //DELETE
    static delete = async (req,res)=>{
        try{
            await User.findOneAndDelete({_id:ObjectId(req.user._id)})
            res.status(200).send('user deleted')
        }
        catch(e){
            res.status(500).send(e.message)
        }
    } 
    //PROFILE
    static profile = async (req,res)=>{
        res.status(200).send(req.user)
    }
}

module.exports = UserController