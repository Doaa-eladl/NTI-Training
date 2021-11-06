const User=require('../db/models/user.model')
const Product=require('../db/models/products.model')
const CryptoJS = require("crypto-js");
const Cart=require('../db/models/cart.model')
const { ObjectId } = require('mongodb');
const upload = require('../middleware/fileupload');
const Myorders = require('../db/models/myorders.model');

class AdminController{
    //show single user
    static showsingleuser = async (req,res) =>{
        try{
            const user = await User.findById({_id:req.params.id})
            if(!user) throw new Error('user not found')
            res.status(200).send(user)
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //UPDATE ANY USER
    static updateanyuser = async (req,res) =>{
        try{
            const newuser = await User.findOneAndUpdate({_id:ObjectId(req.params.id)},{
                $set:req.body
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
            //should found his cart also
            const usercart = await Cart.find({userId:req.params.id})
            //return stock first
            for(let i=0;i<usercart[0].productsId.length;i++){
                const product = await Product.findById( { _id:usercart[0].productsId[i].productId } )
                product.stock+=usercart[0].productsId[i].quantity
                await product.save()
            }
            //should delete his cart also
            await Cart.deleteOne( { usercart } )
            await User.findOneAndDelete({_id:req.params.id})
            res.status(200).send({message:'user deleted'})
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
    //GET USER STATS number of users every mounth in only this year
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
        try{
            const newproduct = new Product(req.body)
            await newproduct.save()
            res.status(200).send(newproduct)
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
            res.status(200).send({message:'Product deleted'})
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //GET PRODUCT
    static showsingle = async (req,res) =>{
        try{
            const product = await Product.findById(req.params.id)
            res.status(200).send(product)
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //DELETE USER CART BY ADMIN
    static deleteusercart = async (req,res) => {
        try{
            const usercart = await Cart.find( { userId:req.body.userId } )
            //check not found for array
            if(usercart.length==0) throw new Error('this user has no cart yet')
            
            //ارجع ال stock تاني
            for(let i=0;i<usercart[0].productsId.length;i++){
                const product = await Product.findById( { _id:usercart[0].productsId[i].productId } )
                product.stock+=usercart[0].productsId[i].quantity
                await product.save()
            }
            await Cart.deleteOne( { usercart } )
            res.status(200).send({message:'user cart has been deleted'})
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //show all carts
    static showcarts = async (req,res) => {
        try{
            const carts = await Cart.find()
            if(carts.length==0) throw new Error('there is no carts')
            res.status(200).send(carts)
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //show single cart
    static showsinglecart = async (req,res) => {
        try{
            const cart = await Cart.findOne( { userId:req.params.id } )
            if(!cart) throw new Error("user hasn't cart yet ")
            res.status(200).send(cart)
        }
        catch(e){
            res.status(200).send(e.message)
        }
    }
    //show single user orders
    static showsingleorders = async (req,res) => {
        try{
            const orders = await Myorders.findOne( { userId:req.params.id } )
            if(!orders) throw new Error("user hasn't orders yet ")
            res.status(200).send(orders)
        }
        catch(e){
            res.status(200).send(e.message)
        }
    }
    //show all users orders
    static showorders = async (req,res) => {
        try{
            const userorders = await Myorders.find()
            if(userorders.length==0) throw new Error('no orders found')
            res.status(200).send(userorders)
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //show profits
    static showprofits = async (req,res) => {
        try{
            const orders = await Myorders.find()
            if(orders.length==0) throw new Error('there is no orders')
            let profits = 0
            for(let i=0;i<orders.length;i++){
                for(let y=0;y<orders[i].orders.length;y++){
                    for(let r=0;r<orders[i].orders[y].productsId.length;r++){
                        const product = await Product.findById( { _id:orders[i].orders[y].productsId[r].productId } )
                        for(let u=0;u<orders[i].orders[y].productsId[r].quantity;u++){
                            profits+=product.profit
                        }
                    }
                }
            }
            res.status(200).send({profits:profits})
        }
        catch(e){
            res.status(500).send(e.message)
        }   
    }
    //addnewadmin
    static addnewadmin = async (req,res) => {
        const newuser= new User({
            username:req.body.username,
            email:req.body.email,
            password:CryptoJS.AES.encrypt(req.body.password,process.env.PassSecret).toString(),
            phone:req.body.phone,
            gender:req.body.gender,
            address:req.body.address,
            isAdmin:true
        })
        try{
            const token = await newuser.generateToken()
            await newuser.save()
            res.status(200).send( { newuser , token } )
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    static addproductimg = async (req,res) => {
        try{
            const product = await Product.findById({_id:req.params.id})
            if(!product) throw new Error('no product found')
            product.img = "assets/"+req.file.filename
            await product.save()
            res.status(200).send(product)
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
}

module.exports = AdminController