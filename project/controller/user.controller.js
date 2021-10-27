const User=require('../db/models/user.model')
const Product=require('../db/models/products.model')
const Cart=require('../db/models/cart.model')
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
            res.status(200).send({ user , token })
            
            //another method to hide some details
            //const { password , ...other } = user._doc
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
            //to avoid find user twice
            for (const item in req.body) req.user[item]= req.body[item]
            await req.user.save()
            res.status(200).send(req.user)
            //old method
            /*const newuser = await User.findOneAndUpdate({_id:ObjectId(req.user._id)},{
                $set:req.body
            },{new:true})*/
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //DELETE
    static delete = async (req,res) => {
        try{
            //to avoid find user twice
            await User.deleteOne(req.user)
            res.status(200).send('user deleted')

            //old method
            //await User.findOneAndDelete({_id:ObjectId(req.user._id)})
        }
        catch(e){
            res.status(500).send(e.message)
        }
    } 
    //PROFILE
    static profile = async (req,res) => {
        res.status(200).send(req.user)
    }
    //LOGOUT
    static logout = async (req,res) =>{
        try{
        req.user.tokens = req.user.tokens.filter( token => token.token!=req.token )
        await req.user.save()
        res.status(200).send("user logged out")
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //LOGOUTALL
    static logoutall = async (req,res) =>{
        try{
        req.user.tokens = []
        await req.user.save()
        res.status(200).send("user logged out from all devices")
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
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
    //show notebooks category
    static shownotebookproducts = async (req,res) => {
        try{
            const product = await Product.find( { categorytype: "notebooks" } )
            res.status(200).send(product)
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //show smartphones category
    static showsmartphoneproducts = async (req,res) => {
        try{
            const product = await Product.find( { categorytype: "smartphones" } )
            res.status(200).send(product)
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //ADD TO CART
    static addtocart = async (req,res) => {
        try{
            const product = await Product.findById( { _id : req.body.productId } )
            if(!product) throw new Error('product not found')
            const usercart = await Cart.findOne( { userId:req.user.id } )
            if(!usercart){
                const cart = new Cart( { userId:req.user.id , quantity:req.body.quantity } )
                //بيدخل واحده بس 
                cart.productsId.push(req.body)
                await cart.save()
                res.status(200).send(cart)
            }
            else { 
                let flag=-1
                for(let i=0 ; i<usercart.productsId.length ;i++){  
                    if(usercart.productsId[i].productId==req.body.productId)
                    flag=i
                }
                if(flag!=-1){
                    usercart.productsId[flag].quantity+=req.body.quantity
                }
                else{
                    usercart.productsId.push(req.body)
                }
                await usercart.save()
                res.status(200).send(usercart)
            }
        }
        catch(e){ res.status(500).send(e.message) }
    }
    //show my own cart
    static showcart = async (req,res) =>{
        try{
            const mycart = await Cart.findOne( { userId:req.user.id } )
            if(!mycart) throw new Error('this user has no cart yet')
            let products  =[]
            for(let i=0 ; i<mycart.productsId.length ;i++){
                const iteratedproduct = mycart.productsId[i].productId
                const product = await Product.findById( { _id:iteratedproduct } )
                products.push(product)
            }
            if(products.length==0) throw new Error('user cart empty')
            res.status(200).send(products)
        }
        catch(e){ res.status(500).send(e.message) }
    }
    //delete my cart
    static deletecart = async (req,res) => {
        try{
            const mycart = await Cart.deleteOne( { userId:req.user.id } )
            if(!mycart) throw new Error('this user has no cart yet')
            res.status(200).send('this cart deleted')
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //increase quantity of products in cart
    static increasequantity = async (req,res) => {
        try{
            const mycart = await Cart.findOne( { userId:req.user.id } )
            if(!mycart) throw new Error('this user has no cart yet')
            const updatedproduct = mycart.productsId.filter(productdetels=>{
                return productdetels.productId==req.body.productId
            })
            if(updatedproduct.length==0) throw new Error('this product does not exist in cart')
            const product = await Product.findById( { _id:updatedproduct[0].productId } )
            if(!product) throw new Error('there is no product has this id in shop')
            if(updatedproduct[0].quantity<product.stock){
                updatedproduct[0].quantity++
                await mycart.save()
            }else throw new Error('there is no stock for this product')
            res.status(200).send(mycart)
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //decrease quantity of products in cart
    static decreasequantity = async (req,res) => {
        try{
            let mycart = await Cart.findOne( { userId:req.user.id } )
            if(!mycart) throw new Error('this user has no cart yet')
            const updatedproduct = mycart.productsId.filter(productdetels=>{
                return productdetels.productId==req.body.productId
            })
            if(updatedproduct.length==0) throw new Error('this product does not exist in cart')
            if(updatedproduct[0].quantity==1){
                mycart.productsId = mycart.productsId.filter(product=>{ return product.productId!=updatedproduct[0].productId})
            }else{
                updatedproduct[0].quantity--
            }
            await mycart.save()
            res.status(200).send(mycart)
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //delete from cart (delete product id)
    static deleteproductfromcart = async (req,res) => {
        try{
            let mycart = await Cart.findOne( { userId:req.user.id } )
            if(!mycart) throw new Error('this user has no cart yet')
            mycart.productsId = mycart.productsId.filter(product=>{ return product.productId!=req.body.productId})
            await mycart.save()
            res.status(200).send('this cart deleted')
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //show order one roduct
    static showorder = async (req,res) => {
        try{
            const product = await Product.findById( { _id:req.body.productId } )
            if(!product) throw new Error('product not found')
            const productdata ={ title:product.title , price:product.price }
            const userdata = { username:req.user.username , phone:req.user.phone , address:req.user.address}
            res.status(200).send({...productdata,...userdata})
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //Confirmation the order
    static confirmation = async (req,res) => {
        try{
            const product = await Product.findById( { _id:req.body.productId } )
            if(!product) throw new Error('product not found')
            let flag=-1
            for(let i=0;i<req.user.orders.length;i++){
                // ف حاجات js بتغيرها ف لازم ارجع احولها ل string
                if( req.user.orders[i].id == product._id.toString()){
                // if( req.user.orders[i].id == req.body.productId ){
                    flag=i
                }
            }
            console.log(flag)
            if(flag!=-1){
                console.log('old')
                req.user.orders[flag].quantity++
                req.user.orders[flag].price += product.price
                await req.user.save()
            }
            else{
                console.log('new')
                const productdata ={ id:product._id , title:product.title , price:product.price , quantity:1 }
                const order = {...productdata}
                req.user.orders.push(order)
            }
            await req.user.save()
            res.status(200).send(req.user)
        }
        catch(e){
            res.status(500).send(e.message)
        }

        //delete product from cart
    }
    //Confirmation the order
    static sendorder = async (req,res) => {
        try{
            const product = await Product.findById( { _id:req.body.productId } )
            if(!product) throw new Error('product not found')
            let flag=-1
            for(let i=0;i<req.user.orders.length;i++){
                // ف حاجات js بتغيرها ف لازم ارجع احولها ل string
                if( req.user.orders[i].id == product._id.toString()){
                // if( req.user.orders[i].id == req.body.productId ){
                    flag=i
                }
            }
            console.log(flag)
            if(flag!=-1){
                console.log('old')
                req.user.orders[flag].quantity++
                req.user.orders[flag].price += product.price
                await req.user.save()
            }
            else{
                console.log('new')
                const productdata ={ id:product._id , title:product.title , price:product.price , quantity:1 }
                const order = {...productdata}
                req.user.orders.push(order)
            }
            await req.user.save()
            res.status(200).send(req.user)
        }
        catch(e){
            res.status(500).send(e.message)
        }

        //delete product from cart
    }
}

module.exports = UserController