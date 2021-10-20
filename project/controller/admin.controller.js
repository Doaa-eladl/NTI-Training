const User=require('../db/models/user.model')
const Product=require('../db/models/products.model')
const CryptoJS = require("crypto-js");
const { ObjectId } = require('mongodb');

class AdminController{
    //UPDATE ANY USER
    static updateanyuser = async (req,res) =>{
         //to be able to change pass
         if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(req.params.password,process.env.PassSecret).toString()
        }
        try{
            const newuser = await User.findOneAndUpdate({_id:ObjectId(req.params.id)},{
                $set:req.body
                //delete req.body._id
            },{new:true})
            res.status(200).send(newuser)
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //DELETE ANY USER
    static deleteanyuser = async (req,res) =>{
        try{
            await User.findOneAndDelete({_id:req.params.id})
            res.status(200).send('user deleted')
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //SHOW ALL USERS
    static showallusers = async (req,res) =>{
        try{
            const users = await User.find()
            if(!users) throw new Error('no users found')
            res.status(200).send(users)
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //GET USER STATS numder of users every mounth in only this year
    static stats = async (req,res) =>{
        const date = new Date()
        const lastyear = new Date(date.setFullYear(date.getFullYear()-1))
        try{
            const data = await User.aggregate([
                //only this year
                { $match: { createdAt: { $gte:lastyear } } },
                //get mounth number
                { $project: { month: { $month: '$createdAt' } } },
                //creat retarn object by uniqe id == mounth number and total user created at this mounth
                { $group: { _id: "$month" , total: { $sum: 1 } } }
            ])
            res.status(200).send(data)
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //ADD PRODUCTS
    static product = async (req,res) =>{
        const newproduct = new Product(req.body)
        try{
            const token = await newproduct.generateToken()
            await newproduct.save()
            res.status(200).send({newproduct , token})
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //UPDATE PRODUCT
    static updateproduct = async (req,res) => {
        try{
            const newproduct = await Product.findOneAndUpdate({_id:ObjectId(req.params.id)},{
                $set:req.body
            },{new:true})
            if(!newproduct) throw new Error('not found')
            res.status(200).send(newproduct)
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //DELETE PRODUCT
    static deleteproduct = async (req,res)=>{
        try{
            await Product.findOneAndDelete({_id:req.params.id})
            res.status(200).send('Product deleted')
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    /*GET PRODUCT
    static getproduct = async (req,res) =>{
    }*/
    //GET ALL PRODUCTS
    static getallproducts = async (req,res) =>{
        try{
            const products = await Product.find()
            if(!products) throw new Error('no products found')
            res.status(200).send(products)
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
}

module.exports = AdminController