const mongoose=require('mongoose')
const validator=require('validator')
const jwt = require('jsonwebtoken');

const ProductsSchema=mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        trim:true,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    profit:{
        type:Number,
        required:true
    },
    img:{},
    tokens:[ { token: { type:String , required:true } } ]
    },
    { timestamps : true}
)

ProductsSchema.methods.generateToken = async function(){
    const product=this
    const token= await jwt.sign({_id:product._id},process.env.JWTTOKEN)
    product.tokens.push({token})
    await product.save()
    return token
}

const Products=mongoose.model('Products',ProductsSchema)
module.exports=Products