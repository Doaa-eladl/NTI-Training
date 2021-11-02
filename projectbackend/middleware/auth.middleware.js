const jwt = require("jsonwebtoken")
const User = require("../db/models/user.model")
const { ObjectId } = require('mongodb');

const verifytoken = async(req,res,next)=>{
    const authheader=req.headers.token
    if(authheader){
        const token=authheader.replace("Bearer ", "")
        try{
            const decoded = jwt.verify(token,process.env.JWTTOKEN)
            req.decoded=decoded
            req.token=token
            next()
        }
        catch(e){ res.send(e.message)}
    }
    else{
        res.send('unauthorized')
    }
}

const verifytokenandauthorization = async(req,res,next)=>{
    verifytoken(req,res,async()=>{
        try{
            const user = await User.findOne({_id: ObjectId(req.decoded._id), 'tokens.token': req.token})
            if(!user) throw new Error('not found')
            req.user = user
            next()
        }
        catch(e){ res.status(500).send({apiStatus:false, data: e, message:"unauthorized"})}
    })
}

const verifytokenandauthorizationAndAdmin = async(req,res,next)=>{
    verifytoken(req,res,async()=>{
        try{
            const user = await User.findOne({_id: ObjectId(req.decoded._id), 'tokens.token': req.token , isAdmin:true})
            if(!user) throw new Error('not found')
            req.user = user
            next()
        }
        catch(e){ res.status(500).send({apiStatus:false, data: e, message:"unauthorized"})}
    })
}
module.exports={verifytokenandauthorization,verifytokenandauthorizationAndAdmin}