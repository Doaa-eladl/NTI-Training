const mongoose=require('mongoose')
const CartSchema=mongoose.Schema({
    userId:{
        type:String,
        trim:true,
        required:true
    },
    products:[
        {
            productId:{
                type:String,
                trim:true,
                required:true
            },
            quantity:{
              type:String,
              default:1  
            },
            amount:{
                type:Number,
                required:true
            }
        }
    ]
})

const Cart=mongoose.model('Cart',CartSchema)
module.exports=Cart