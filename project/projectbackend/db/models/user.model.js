const mongoose=require('mongoose')
const validator=require('validator')
const jwt = require('jsonwebtoken');

const UserSchema= mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error('invalid mail')
        }
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    phone:{
        type:String,
        trim:true,
        required:true,
        validate(value){
            if(!validator.isMobilePhone(value, ['ar-EG'])) throw new Error("invalid mobile number")
        }
    },
    gender:{
        type:String,
        trim:true,
        enum:['male','female']
    },
    isAdmin:{
        type:Boolean,
        default: false
    },
    address:{
        type:Object,
        required:true
    },
    orders:[{}],
    tokens:[ { token: { type:String , required:true } } ]
    },
    { timestamps : true}
)

UserSchema.methods.toJSON = function(){
    const data = this.toObject()
    delete data.password
    delete data.__v
    delete data.tokens
    return data
}

UserSchema.methods.generateToken = async function(){
    const user=this
    const token= await jwt.sign({_id:user._id},process.env.JWTTOKEN)
    user.tokens.push({token})
    await user.save()
    return token
}

const User=mongoose.model('User',UserSchema)
module.exports=User