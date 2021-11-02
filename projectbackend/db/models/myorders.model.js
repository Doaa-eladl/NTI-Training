const mongoose=require('mongoose')

const OrdersSchema=mongoose.Schema({
    userId:{
        type:String,
        trim:true,
        required:true
    },
    orders:[
        {
            productsId:[
                {
                    productId:[] ,
                    quantity:{ type:Number , default:0 }
                }
            ],
            totalprice:{ type:Number , default:0 }
        }
    ],
    // المفروض تكون عدد مرات الضغط عالزرار
})

OrdersSchema.methods.toJSON = function(){
    const data = this.toObject()
    delete data._id
    delete data.__v
    return data
}

const Myorders=mongoose.model('myorders',OrdersSchema)
module.exports=Myorders