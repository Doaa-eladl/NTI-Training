const User=require('../db/models/user.model')
const Product=require('../db/models/products.model')
const CryptoJS = require("crypto-js");
const Cart=require('../db/models/cart.model')
const { ObjectId } = require('mongodb');
const upload = require('../middleware/fileupload');

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
    //GET PRODUCT
    static showsingle = async (req,res) =>{
        try{
            const product = await Product.findById(req.body.id)
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
            await Cart.deleteOne( { usercart } )
            res.status(200).send('user cart has been deleted')
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
            const cart = await Cart.findOne( { userId:req.body.userId } )
            if(!cart) throw new Error('cart not found')
            res.status(200).send(cart)
        }
        catch(e){
            res.status(200).send(e.message)
        }
    }
    //show all users orders
    static showorders = async (req,res) => {
        try{
            const users = await User.find()
            if(users.length==0) throw new Error('no users found')
            let data =[]
            for(let i=0;i<users.length ;i++){
                data.push( { useerid:users[i]._id , username:users[i].username ,orders:users[i].orders } )
                console.log(data)
            }
            if(data.length==0) throw new Error('no orders found')
            res.status(200).send(data)
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //show profits
    static showprofits = async (req,res) => {
        try{
            const users = await User.find()
            if(users.length==0) throw new Error('no users found')
            let profits=0
            for(let i=0;i<users.length ;i++){
                if(users[i].orders.length!=0){
                    for(let y =0;y<users[i].orders.length;y++){
                        if(typeof users[i].orders[y]!="number"){
                            const product = await Product.findById({_id:users[i].orders[y].productId})
                            for(let t=0;t<users[i].orders[y].quantity;t++){
                                profits+=product.profit
                            }
                        }
                    }
                }
            }
            res.status(200).send({"profits":profits})
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