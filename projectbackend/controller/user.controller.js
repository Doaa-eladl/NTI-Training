const User=require('../db/models/user.model')
const Product=require('../db/models/products.model')
const Cart=require('../db/models/cart.model')
const CryptoJS = require("crypto-js");
const Myorders = require('../db/models/myorders.model');

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
            const token = await newuser.generateToken()
            await newuser.save()
            res.status(200).send({ newuser , token })
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
    //change password
    static changepass = async (req,res) => {
        const oldpassword = CryptoJS.AES.decrypt(req.user.password,process.env.PassSecret).toString(CryptoJS.enc.Utf8)
        try{
            if(req.body.oldpassword==oldpassword){
                const newpass = CryptoJS.AES.encrypt(req.body.newpass,process.env.PassSecret).toString()
                req.user.password=newpass
                await req.user.save()
                res.status(200).send(req.user)
            }
            else throw new Error('old password wrong')
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //UPDATE
    static update = async (req,res) =>{
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
            res.status(200).send({message:'user deleted'})

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
        res.status(200).send({message:"user logged out"})
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
        res.status(200).send({message:"user logged out from all devices"})
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //GET ALL PRODUCTS
    static getallproducts = async (req,res) =>{
        try{
            const products = await Product.find().sort({categorytype:1})
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
            //has no cart creat one
            if(!usercart){
                const cart = new Cart( { userId:req.user.id} )
                //بيدخل واحده بس 
                cart.productsId.push(req.body)
                    product.stock-=req.body.quantity
                    for(let i=0 ; i<req.body.quantity ; i++){
                        cart.totalprice += product.price
                    }
                await cart.save()
                res.status(200).send(cart)
            }
            //has cart
            else { 
                let flag=-1
                //search product in cart
                for(let i=0 ; i<usercart.productsId.length ;i++){  
                    if(usercart.productsId[i].productId==req.body.productId)
                    flag=i
                }
                //prouduct found in cart increase it is quantity
                if(flag!=-1){
                    usercart.productsId[flag].quantity+=req.body.quantity
                    product.stock-=req.body.quantity
                    for(let i=0;i<req.body.quantity;i++){
                        usercart.totalprice+=product.price
                    }
                }
                //has cart but has not this prouduct on it
                else{
                    usercart.productsId.push(req.body)
                    product.stock-=req.body.quantity
                    for(let i=0;i<req.body.quantity;i++){
                        usercart.totalprice+=product.price
                    }
                }
                await usercart.save()
                res.status(200).send(usercart)
            }
            await product.save()
        }
        catch(e){ res.status(500).send(e.message) }
    }
    //show my own cart
    static showcart = async (req,res) =>{
        try{
            const mycart = await Cart.findOne( { userId:req.user.id } )
            if(!mycart) throw new Error('this user has no cart yet')
            let products  =[]
            let quantity =0
            for(let i=0 ; i<mycart.productsId.length ;i++){
                const iteratedproduct = mycart.productsId[i].productId
                quantity = mycart.productsId[i].quantity
                const product = await Product.findById( { _id:iteratedproduct } )
                products.push({product,quantity})
            }
            if(products.length==0) throw new Error('user cart empty')
            const totalprice = mycart.totalprice
            res.status(200).send({products,totalprice})
        }
        catch(e){ res.status(500).send(e.message) }
    }
    //delete my cart
    static deletecart = async (req,res) => {
        try{
            let mycart = await Cart.find( { userId:req.user.id } )
            if(!mycart) throw new Error('this user has no cart yet')
            //ارجع ال stock تاني
            //console.log(mycart[0].productsId.length)
            for(let i=0;i<mycart[0].productsId.length;i++){
                const product = await Product.findById( { _id:mycart[0].productsId[i].productId } )
                product.stock+=mycart[0].productsId[i].quantity
                await product.save()
            }
            mycart = await Cart.deleteOne( { userId:req.user.id } )
            res.status(200).send({message:'this cart deleted'})
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
            if(product.stock!=0){
                updatedproduct[0].quantity++
                product.stock--
            }else throw new Error('there is no stock for this product')
            mycart.totalprice=0
            for(let i=0;i<mycart.productsId.length;i++){
                for(let y=0 ;y<mycart.productsId[i].quantity;y++){
                    const product = await Product.findById({_id:mycart.productsId[i].productId})
                    mycart.totalprice+=product.price
                }
            }
            await product.save()
            await mycart.save()
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
            const product = await Product.findById( { _id:updatedproduct[0].productId } )
            if(!product) throw new Error('there is no product has this id in shop')
            if(updatedproduct[0].quantity==1){
                mycart.productsId = mycart.productsId.filter(product=>{ return product.productId!=updatedproduct[0].productId})
            }else{
                updatedproduct[0].quantity--
                product.stock++
            }
            mycart.totalprice=0
            for(let i=0;i<mycart.productsId.length;i++){
                for(let y=0 ;y<mycart.productsId[i].quantity;y++){
                    const product = await Product.findById({_id:mycart.productsId[i].productId})
                    mycart.totalprice+=product.price
                }
            }
            await product.save()
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
            //ارجع ال stock تاني
            const product = await Product.findById( { _id:req.body.productId } )
            for(let i=0;i<mycart.productsId.length;i++){
                if(mycart.productsId[i].productId==req.body.productId){
                    //ظبط التوتال تاني
                    for(let r=0;r<mycart.productsId[i].quantity;r++){
                        mycart.totalprice-=product.price
                    }
                    product.stock+=mycart.productsId[i].quantity
                }
            }
            //امسح العنصر ده من السله
            mycart.productsId = mycart.productsId.filter(product=>{ return product.productId!=req.body.productId})
            await product.save()
            await mycart.save()
            res.status(200).send({message:'item deleted'})
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //show order one roduct
    static showorder = async (req,res) => {
        try{
            const mycart = await Cart.find( {userId:req.user._id} )
            const totalprice=mycart[0].totalprice
            const productdata=[]
            for(let i=0;i<mycart[0].productsId.length;i++){
                const product = await Product.findById( { _id:mycart[0].productsId[i].productId } )
                if(!product) throw new Error('product not found')
                productdata.push( { productstitle : product.title , productprice : product.price , quantity : mycart[0].productsId[i].quantity} )
            }
            const userdata = { username:req.user.username , phone:req.user.phone , address:req.user.address}
            res.status(200).send({...userdata,productdata,totalprice})
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    //Confirmation the order
    static sendorder = async (req,res) => {
        try{
            const cart = await Cart.findOne({userId:req.user.id})
            if(!cart) throw new Error('this user has no cart yet')
            const userorders = await Myorders.findOne( { userId:req.user.id } )
            //has no cart creat one
            if(!userorders){
                const neworder = new Myorders( { userId:req.user.id} )
                const info = {productsId:cart.productsId ,totalprice:cart.totalprice}
                neworder.orders.push(info)
                await neworder.save()
                res.status(200).send(neworder)
            }
            else{
                const info = {productsId:cart.productsId ,totalprice:cart.totalprice}
                userorders.orders.push(info)
                await userorders.save()
                res.status(200).send(userorders)
            }
            await Cart.findOneAndDelete({userId:req.user.id})
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
    // if user want to see his order but i have problem in frontend
    static showuserorder = async (req,res) => {
        try{
            const userorder = await Myorders.findOne({userId:req.user.id})
            if(!userorder) throw new Error('no order')
            res.status(200).send(userorder)
        }
        catch(e){
            res.status(500).send(e.message)
        }
    }
}

module.exports = UserController

//Confirmation the order old function error in logic
   /* static confirmation = async (req,res) => {
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
    }*/

//old function we needn't all that it can fix easly on front
    /*static addtocart = async (req,res) => {
        try{
            const product = await Product.findById( { _id : req.body.productId } )
            if(!product) throw new Error('product not found')
            const usercart = await Cart.findOne( { userId:req.user.id } )
            //has no cart creat one
            if(!usercart){
                const cart = new Cart( { userId:req.user.id} )
                //بيدخل واحده بس 
                cart.productsId.push(req.body)
                if(typeof req.body.quantity=='undefined'){
                    cart.productsId[0].quantity+=1
                    cart.totalprice+=product.price
                    product.stock-=1
                }
                else {
                    product.stock-=req.body.quantity
                    for(let i=0 ; i<req.body.quantity ; i++){
                        cart.totalprice += product.price
                    }
                    //دي كان سطر مش منطقي خالص !!
                    //cart.productsId[0].quantity+=req.body.quantity
                }
                await cart.save()
                res.status(200).send(cart)
            }
            //has cart
            else { 
                let flag=-1
                //search product in cart
                for(let i=0 ; i<usercart.productsId.length ;i++){  
                    if(usercart.productsId[i].productId==req.body.productId)
                    flag=i
                }
                //prouduct found in cart increase it is quantity
                if(flag!=-1){
                    if(typeof req.body.quantity=='undefined'){
                        usercart.productsId[flag].quantity+=1
                        usercart.totalprice+=product.price
                        product.stock-=1
                    }
                    else{
                        usercart.productsId[flag].quantity+=req.body.quantity
                        product.stock-=req.body.quantity
                        for(let i=0;i<req.body.quantity;i++){
                            usercart.totalprice+=product.price
                        }
                    }
                }
                //has cart but has not this prouduct on in
                else{
                    if(typeof req.body.quantity=='undefined'){
                        usercart.productsId.push(req.body)
                        usercart.productsId[usercart.productsId.length-1].quantity+=1
                        usercart.totalprice+=product.price
                        product.stock-=1
                    }
                   else{
                        usercart.productsId.push(req.body)
                        product.stock-=req.body.quantity
                        for(let i=0;i<req.body.quantity;i++){
                            usercart.totalprice+=product.price
                        }
                    }
                }
                await usercart.save()
                res.status(200).send(usercart)
            }
            await product.save()
        }
        catch(e){ res.status(500).send(e.message) }
    }*/