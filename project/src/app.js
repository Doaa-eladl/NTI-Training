require('dotenv').config()

const express=require('express')
const app=express()

const corse=require('cors')
app.use(corse())
app.use(express.json())
//send file or images
app.use(express.urlencoded({extended:true}))

require('../db/connection')

const adminRoutes=require('../routes/admin.routes')
const userRoutes=require('../routes/user.routes')
const authRoutes=require('../routes/auth.routes')

app.use('/admin',adminRoutes)
app.use("/user",userRoutes)
app.use("/auth",authRoutes)

module.exports=app